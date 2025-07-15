// src/controllers/booking.controller.js
const { Booking, Room, User } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  // POST /api/bookings
  async createBooking(req, res) {
    try {
      const { roomId, startTime, endTime, purpose, kategoriId } = req.body;
      const userId = req.user.id;

      // Validasi waktu booking tidak bentrok
      const conflict = await Booking.findOne({
        where: {
          roomId,
          status: { [Op.in]: ['approved', 'booked', 'checked-in'] },
          [Op.or]: [
            {
              startTime: { [Op.between]: [startTime, endTime] }
            },
            {
              endTime: { [Op.between]: [startTime, endTime] }
            },
            {
              [Op.and]: [
                { startTime: { [Op.lte]: startTime } },
                { endTime: { [Op.gte]: endTime } }
              ]
            }
          ]
        }
      });

      if (conflict) {
        return res.status(409).json({ message: 'Waktu booking sudah terisi' });
      }

      const room = await Room.findByPk(roomId);
      if (!room) return res.status(404).json({ message: 'Ruangan tidak ditemukan' });

      const durationHours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
      const totalPrice = durationHours * room.pricePerHour;

      const booking = await Booking.create({
        userId,
        roomId,
        startTime,
        endTime,
        purpose,
        kategoriId,
        totalPrice,
        status: 'pending'
      });

      res.status(201).json({ message: 'Booking berhasil dibuat', booking });
    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // GET /api/bookings (admin/staff)
  async getBookings(req, res) {
    try {
      const bookings = await Booking.findAll({
        include: ['user', 'room']
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  },

  // GET /api/bookings/me
  async getMyBookings(req, res) {
    try {
      const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: ['room']
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user bookings' });
    }
  },

  // PUT /api/bookings/:id
  async updateBooking(req, res) {
    try {
      const { id } = req.params;
      const { startTime, endTime, purpose } = req.body;

      const booking = await Booking.findByPk(id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });

      if (booking.userId !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized to edit this booking' });
      }

      await booking.update({ startTime, endTime, purpose });
      res.json({ message: 'Booking updated', booking });
    } catch (error) {
      res.status(500).json({ message: 'Error updating booking' });
    }
  },

  // DELETE /api/bookings/:id
  async cancelBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });

      if (booking.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized to cancel this booking' });
      }

      await booking.update({ status: 'cancelled' });
      res.json({ message: 'Booking cancelled' });
    } catch (error) {
      res.status(500).json({ message: 'Error cancelling booking' });
    }
  },

  // PUT /api/bookings/:id/status
async approveBooking(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ message: 'Booking tidak ditemukan' });

    // Generate booking_code jika belum ada
    if (status === 'approved' && !booking.booking_code) {
      const random = Math.random().toString(36).substring(2, 7).toUpperCase();
      const year = new Date().getFullYear();
      booking.booking_code = `MCC-${year}-${random}`;
    }

    await booking.update({ status, booking_code: booking.booking_code });

    res.json({
      message: `Booking berhasil di-${status === 'approved' ? 'setujui' : 'tolak'}`,
      booking
    });
  } catch (error) {
    console.error('Approval error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
}

};
