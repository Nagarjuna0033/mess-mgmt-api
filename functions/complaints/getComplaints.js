const { onRequest } = require("firebase-functions/v2/https");
const { db } = require("../firebaseConfig");
const { getDocs, collection } = require("firebase/firestore");
const cors = require("cors")({ origin: true });

exports.getcomplaintsData = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "complaints"));
      const complaints = [];

      querySnapshot.forEach((doc) => {
        complaints.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).send({ complaints: { complaints } });
    } catch (error) {
      console.error("Error fetching complaints data:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
});
