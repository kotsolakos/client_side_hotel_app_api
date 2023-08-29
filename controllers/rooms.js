const handleRoomsGet = (req, res, db) => {
    db.select('*').from('hotel_rooms')
      .then(rooms => {
        if (rooms.length) {
          res.json(rooms)
        } else {
          res.status(400).json('Not found')
        }
      })
      .catch(err => res.status(400).json('error getting rooms'))
  }

  const handleRoomsPut = (req, res, db) => {
    const { roomId, userId, name } = req.body;
    let reserved_by;
    if(userId){
      reserved_by = userId + ", " + name;
    }
    else{
      reserved_by = "";
    }
    
    db('hotel_rooms')
    .where('id', '=', roomId)
    .update({ reserved_by: reserved_by }) // Update the 'reserved_by' column
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
    handleRoomsGet,
    handleRoomsPut
  }