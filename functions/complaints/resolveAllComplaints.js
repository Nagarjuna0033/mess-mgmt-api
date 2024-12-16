const { onRequest } = require("firebase-functions/v2/https");
const { db } = require("../firebaseConfig");
const { getDocs, collection, writeBatch } = require("firebase/firestore");
const cors = require("cors")({ origin: true });

exports.resolveAllComplaints = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const statusToCommit = req.query.status;
    const category = req.query.category;

    if (!statusToCommit) {
      return res.status(404).send({
        error: "required status query to override status of complaints",
      });
    }
    try {
      const complaintsCollection = collection(db, "complaints");
      const querySnapshot = await getDocs(complaintsCollection);

      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (
          docData.category === category &&
          docData.status !== statusToCommit
        ) {
          const docRef = doc.ref;
          batch.update(docRef, { status: statusToCommit });
        }
      });
      await batch.commit();
      res.status(200).send({
        message: `All documents with category ${category} updated to ${statusToCommit}.`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
});
