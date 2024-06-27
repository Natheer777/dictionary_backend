const userModel = require('../Models/User');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const result = await userModel.getUser();
      res.send(result);
    } catch (error) {
      res.status(500).send("Error fetching users");
    }
  }

  static async addUser(req, res) {
    const { kana, meaning_summary, short_meaning_summary } = req.body;
    try {
      const answer = await userModel.addNewUser(kana, meaning_summary, short_meaning_summary);
      if (answer) {
        res.send("Add successfully");
      } else {
        res.status(500).send("Add failed");
      }
    } catch (error) {
      res.status(500).send("Error adding user");
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.body;
    try {
      if (id) {
        const resultId = await userModel.deleteUser(id);
        if (resultId) {
          res.send("Delete done");
        } else {
          res.status(500).send("Delete failed");
        }
      } else {
        res.status(400).send("ID is required");
      }
    } catch (error) {
      res.status(500).send("Error deleting user");
    }
  }

  static async editUser(req, res) {
    const { id, kana, meaning_summary, short_meaning_summary } = req.body;
    try {
      if (id) {
        const editAnswer = await userModel.editUser(id, kana, meaning_summary, short_meaning_summary);
        if (editAnswer) {
          res.send("Edit done");
        } else {
          res.status(500).send("Edit failed");
        }
      } else {
        res.status(400).send("ID is required");
      }
    } catch (error) {
      res.status(500).send("Error editing user");
    }
  }
  static async insertWords(req, res) {
    const words = req.body.words;
    if (!words || !Array.isArray(words)) {
      return res.status(400).json({ error: 'Invalid data format, expected an array of words' });
    }

    try {
      const result = await userModel.insertWords(words);
      res.status(200).json({ message: 'Data inserted successfully', results: result });
    } catch (error) {
      res.status(500).json({ error: 'Error inserting data' });
    }
  }
  static async searchWords(req, res) {
    const { Term, Page, Mode } = req.body;
    try {
      const result = await userModel.searchWords(Term, Page, Mode);
      if (result.Items.length > 0) {
        res.send(result);
      } else {
        res.status(404).send({ message: 'No words found' });
      }
    } catch (error) {
      res.status(500).send({ error: 'Error searching words' });
    }
  }
}

module.exports = UserController;