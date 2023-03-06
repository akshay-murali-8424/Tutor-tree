import mongoose from "mongoose"
mongoose.set('strictQuery',true)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE!)
    console.log(`Database connected successfully`.bg_green)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB