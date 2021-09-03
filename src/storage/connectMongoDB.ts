import { ConnectOptions, connect } from "mongoose";

const  connectMongoDB = async (mongoURI: string, dbName?:string, user?:string, pass?:string ) => {
  try {
    const options: ConnectOptions = {
      dbName,
      user,
      pass,
    };

    await connect(mongoURI, options);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectMongoDB;