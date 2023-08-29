  const handleProfilePut = (req, res, db) => {
    const { id, reserved_rooms } = req.body;
    db('users')
    .where('id', '=', id)
    .update({ reserved_rooms: reserved_rooms }) // Update the 'reserved_rooms' column
    .then(updatedCount => {
      if (updatedCount) {
        res.json('Record updated successfully');
      } else {
        res.status(400).json('Record not found');
      }
    })
    .catch(err => res.status(400).json('Error updating record'));
  }
  
  module.exports = {
    handleProfilePut
  }
  