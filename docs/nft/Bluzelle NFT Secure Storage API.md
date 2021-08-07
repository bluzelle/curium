# Bluzelle NFT Secure Storage API

The bluzelle NFT API is a two step process.  

* Upload the file (from the browser)
* Notify the network that the file has been uploaded (from your application server)

The second step is necessary so that your identity credentials can be kept secure while not requiring you to act as the middle man for the upload.  The file upload happens directly between the users browser and the Bluzelle Net.

The process looks like this:

[Protocol diagram](bluzelle.github.com/curium/docs/nft/protocol.png)

### Step 1: Upload

We have provided a helper function in our Bluzelle JS client library to aid with the upload.  You can use this code in your browser application.

````typescript
import {uploadNft} from 'bluzelle'
uploadNft("https:...", data as Uint8Array, "your_org_id"))
````



**The url and org_id will be provided to you by Bluzelle.**

### Step 2: Notify the network

In order for the network to start replicating the uploaded file, it must be notified that the file has been uploaded.  We have created another helper function to aid you.

```typescript
bz.createNft(
            id,                  // The id you want to assign to this file
            hash,                // The hash of the file
            vendor,              // Your organization id 
            userId,              // Your id for the user that uploaded the file
            mime,                // The mime type for this file
            'metadata',          // Any arbritrary metadata you want to store for this file
            gasParams)           // The gas parameters for the transaction (these will be provided to you)
```

### Creating a bluzelle client instance

Instructions on how to install and use the bluzelle JS client is at https://github.com/bluzelle/blzjs

