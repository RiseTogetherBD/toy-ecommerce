import app from "./app";
import config from "./app/Config";
import { prisma } from "./app/lib/prisma";

const port = config.port ||5000


// Start server
async function server() {
  try{
    await prisma.$connect()
    console.log("Database connected")
    app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} in ${config.node_env} mode `);
});

  }catch(error){
    console.log("server failed to start", error)
    await prisma.$disconnect()
    process.exit(1)

  } 
  
}
server()

