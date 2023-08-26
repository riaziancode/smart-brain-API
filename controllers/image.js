
// ===============> end point for face recognition =================>
const PAT = '66b755bfdb2d4c129a18e5df6af9f9ae';
const USER_ID = 'clarifai';       
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    


const handleAPICall=(req, res)=>{

    fetch(
    "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
      {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": req.body.imageurl
                      }
                  }
              }
          ]
      })
    }
  )
  .then(response=> response.json())
  .then(data=>  res.json(data))
    
  .catch(err=> res.status(400).json('unable to work with imageAPI'))
}

//================> end point for handling entries increment=================>
const handleImagePut=(req, res, db)=>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning("entries")
    .then(entries=> {
        res.json(entries[0].entries)
    })
    .catch(err=> res.status(400).json('unable to get entries'))   
}

module.exports= {
    handleImagePut: handleImagePut,
    handleAPICall: handleAPICall
}
