module.exports = class Rest {
  constructor(app) {
    this.app = app;

    this.get();
    this.post();
    this.put();
    this.delete();
  }

  get() {
    this.app.get("/rest/:entity", async (req, res) => {
      const query = JSON.parse(decodeURIComponent(req.query.q || '{}'), (key, val) => {
        return key === '$regex' ? this.backToRegEx(val) : val;
      })
      const options = JSON.parse(decodeURIComponent(req.query.o || '{}'))
            
      let results;
      try {
        results = await mongoose.model(req.params.entity).find(query, null, options).exec()
        res.json({ results });
      } catch {
        res.status(404).json({ error: 'Could not find ' + req.params.entity })
      }
    });

    this.app.get("/rest/:entity/:id", async (req, res) => {
      const query = JSON.parse(decodeURIComponent(req.query.q || '{}'), (key, val) => {
        return key === '$regex' ? this.backToRegEx(val) : val;
      })
      let result;
      try {
        result= await mongoose.model(req.params.entity)
        .findOne(query, null, { populate: ['kittens'] }).exec()
      } catch {
        res.status(404).json({ error: `Could not find ${req.params.entity} with id: ${req.params.id}` })
      }
      
      console.log("Found:", result);
      res.json(result);
    });
  }

  post() {
    this.app.post("/rest/:entity", (req, res) => {
      mongoose.model(req.params.entity).create(req.body, async (err, result) => {
        if(err) {
          console.error(err);
          res.status(500).json({ error: 'Could not create ' +  req.params.entity })
        } else {
          console.log("Created:", result);

          if(req.params.entity === 'Kitten') {
            await this.addKittenOwner(req.body.owner, result)
          }
          res.json(result);
        }
      });
    });
  }

  put() {
    this.app.put("/rest/:entity", async (req, res) => {
      try {
        let entity = await mongoose.model(req.params.entity)
          .findOne({ _id: req.body._id })
          .catch(console.error);

        if (entity) {
          Object.assign(entity, req.body);
          const result = await entity.save();
          res.json(result);
        }
      } catch {
        res.status(404).json({ error: "No such " + req.params.entity });
      }
    });
  }

  delete() {
    this.app.delete("/rest/:entity/:id", async (req, res) => {
      try {
        let kitten = await mongoose.model(req.params.entity)
          .findByIdAndDelete({ _id: req.params.id })
          .catch(console.error);

        if (kitten) {
          res.json({
            msg: `Deleted ${req.params.entity}, id: ${req.params.id}`
          });
        }
      } catch {
        res.status(404).json({ error: "No such " + req.params.entity });
      }
    });
  }

  backToRegEx(val) {
    // convert back to reg ex from stringified reg ex
    return new RegExp(
      val.replace(/\w*$/, '').replace(/^\/(.*)\/$/, '$1'),
      (val.match(/\w*$/) || [''])[0]
    );
  }

  addKittenOwner(personId, kitten) {
    mongoose.model('Person')
      .find({ _id: personId }, async (err, person) => {
        if(err) {
          console.error(err);
        } else {
          person = person[0]
          console.log("Add kitten to:", person);

          person.kittens.push(kitten)
          await person.save();
        }
      })
  }
};
