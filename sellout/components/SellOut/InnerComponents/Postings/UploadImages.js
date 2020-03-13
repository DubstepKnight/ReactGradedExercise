import RNCloudinary from 'react-native-cloudinary';


const CLOUD_NAME = 'hbgq5qscq';
const API_KEY = '267426767432492';
const API_SECRET = 'YPrTD2xGGi60qaQ1ZqOGi3waGVA';
const PRESET_NAME = 'ml_default';

RNCloudinary.config(CLOUD_NAME, API_KEY, API_SECRET);

const UploadImages = (filePath) => {

    console.log('Upload images: ',  filePath.uri);

    RNCloudinary.uploadImage(filePath.uri).then(data => {
        // ...
        console.log('upload images: ',  data);
        return data
      })
      .catch(err => {
        // ...
        console.log('err: ', err);
      });




    // try {
        // const uploadRequest = RNCloudinary
        //  .init(props)
        //  .setOptions(options) // Set cloudinary options (Optional)
        //  .setPolicy(policy) // Set upload policy options (Optional)
        //  .setListeners({
        //     onStart: () => {  /* Do something on upload start */ },
        //     onProgress: (bytes, totalBytes) => { /* Show upload progress */ },
        //     onSuccess: () => { /* Do something on success */ },
        //     onError: (e) => { console.log('e: ', e) /* Handle upload time error */ }
        //  })
        //  .dispatch()
    // } catch (error) {
    //     console.log('error: ', error);
    //     // Handle init error
    // }
        
    // uploadRequest.clearListeners() // Clears listeners
    
    // return uploadRequest();
}

export default UploadImages;
