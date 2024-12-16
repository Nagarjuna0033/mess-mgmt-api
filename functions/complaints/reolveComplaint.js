const { onRequest } = require("firebase-functions/v2/https");
const { db } = require("../firebaseConfig");
const { doc, updateDoc, getDoc } = require("firebase/firestore");
const cors = require("cors")({ origin: true });

exports.resolveComplaint = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const documentId = req.query.id;
      const status = req.query.status;
      const docRef = doc(db, "complaints", documentId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return res.status(404).send({ error: "Document not found" });
      }
      const currentData = docSnap.data();

      if (status === currentData.status) {
        return res
          .status(400)
          .send({ error: "status cannot be same as in document" });
      }
      await updateDoc(docRef, { status: status });

      res.status(200).send({
        message: `Document with ID '${documentId}' updated to ${status}.`,
      });
    } catch (error) {
      console.error("Error updating document status:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
});
