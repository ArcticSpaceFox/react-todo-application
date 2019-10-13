import Ipfs from "ipfs";
import OrbitDB from "orbit-db";

// Configuration for IPFS instance
const ipfsConfig = {
  repo: '/orbitdb/todo-tutorial/todo/',
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Addresses: {
      Swarm: [
        // Use IPFS dev signal server
        // Websocket:
        // '/dns4/ws-star-signal-1.servep2p.com/tcp/443/wss/p2p-websocket-star',
        // '/dns4/ws-star-signal-2.servep2p.com/tcp/443/wss/p2p-websocket-star',
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        // WebRTC:
        // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
        // Use local signal server
        // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
      ]
    },
  }
}

// Configuration for the database
const dbConfig = {
  // If database doesn't exist, create it
  create: true,
  // Don't wait to load from the network
  sync: false,
  // Load only the local version of the database
  // localOnly: true,
  // Allow anyone to write to the database,
  // otherwise only the creator of the database can write
  accessController: {
    write: ['*'],
  }
}

const database = async (name) => {
  return new Promise((resolve, reject) => {
    // Create IPFS instance
    const ipfs = new Ipfs(ipfsConfig)

    ipfs.on('error', (e) => console.error(e))
    ipfs.on('ready', async () => {
      try {
        // Create an OrbitDB instance
        const orbitdb = await OrbitDB.createInstance(ipfs)
        // Open (or create) database
        const db = await orbitdb.docstore(name, dbConfig)
        // Done
        resolve([orbitdb, db])
      } catch (e) {
        reject(e)
      }
    })
  })
}

export default database
