const { Booking } = require('../models');

module.exports = {
  async checkIn(req, res) {
    try {
      const { booking_code } = req.body;
      const userId = req.user.id;

      const booking = await Booking.findOne({
        where: { booking_code, userId }
      });

      if (!booking) {
        return res.status(404).json({ message: 'Booking tidak ditemukan atau bukan milik Anda' });
      }

      if (booking.status !== 'approved') {
        return res.status(400).json({ message: 'Booking belum disetujui atau sudah check-in' });
      }

      const now = new Date();
      if (now < new Date(booking.startTime) || now > new Date(booking.endTime)) {
        return res.status(400).json({ message: 'Check-in hanya bisa dilakukan dalam waktu booking' });
      }

      booking.checkInTime = now;
      booking.status = 'checked-in';
      await booking.save();

      res.json({ message: 'Check-in berhasil', booking });
    } catch (error) {
      console.error('Check-in error:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat check-in' });
    }
  }
};
