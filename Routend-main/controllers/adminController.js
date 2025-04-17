import { Member, Route, Trip } from '../model/index.js';


export const users = async (req, res) =>{
    try {
        const users = await Member.findAll();
        res.render('adminUsers', { users });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
      }
}

export const addTripsForm = async (req, res) =>{
    try {
        const routes = await Route.findAll();
        const admins = await Member.findAll({
          where: { isAdmin: 1 }
        });
    
        res.render('addTrip', { routes, admins });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching routes or admins');
      }
}

export const removeTrip = async (req, res) => {
    const { tripId } = req.params;
    try {
      await Trip.destroy({
        where: {
          idTrip: tripId
        }
      });
      res.redirect('/trips');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error removing the trip');
    }
  };

  export const removeUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await Member.destroy({
        where: {
          idMember: userId
        }
      });
      res.redirect('/admin/users');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error removing the user');
    }
  };

  export const promoteUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await Member.update(
        { isAdmin: 1 },
        { where: { idMember: userId } }
      );
      res.redirect('/admin/users');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error promoting user');
    }
  };

  export const addTrip = async (req, res) => {
    const { route, guide, date, weather } = req.body;
    try {
      const newTrip = await Trip.create({
        Time: date,
        idGuide: guide,
        idRoute: route,
        weather: weather
      });
      res.redirect('/trips');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding the trip');
    }
  }