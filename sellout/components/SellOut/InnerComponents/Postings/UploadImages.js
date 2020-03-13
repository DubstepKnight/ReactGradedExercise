import RNCloudinary from '@anarock/react-native-cloudinary';
const filePath = ''

// const options = '';
// const policy = '';
// const filePath = '';


const UploadImages = (props) => {

    console.log('Upload images: ',  props);

    // try {
        const uploadRequest = RNCloudinary
         .init(props)
         .setOptions(options) // Set cloudinary options (Optional)
         .setPolicy(policy) // Set upload policy options (Optional)
         .setListeners({
            onStart: () => {  /* Do something on upload start */ },
            onProgress: (bytes, totalBytes) => { /* Show upload progress */ },
            onSuccess: () => { /* Do something on success */ },
            onError: (e) => { console.log('e: ', e) /* Handle upload time error */ }
         })
         .dispatch()
    // } catch (error) {
    //     console.log('error: ', error);
    //     // Handle init error
    // }
        
    uploadRequest.clearListeners() // Clears listeners
    
    return uploadRequest();
}

export default UploadImages;
