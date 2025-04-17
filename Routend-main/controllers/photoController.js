import { Photo } from "../model/index.js";

export const displayPhotos = async (req, res) => {
    const { tripId } = req.params;
    try {
      const photos = await Photo.findAll({ where: { idTrip: tripId } });
      res.render('photos', { photos, tripId });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching photos');
    }
}

export const addPhoto = async (req, res) => {
    const { tripId } = req.params;
    const { url } = req.body;
    const { userId } = req.user;
    try {
      await Photo.create({ url, idAuthor:userId, idTrip: tripId });
      res.redirect(`/photos/${tripId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding photo');
    }
}