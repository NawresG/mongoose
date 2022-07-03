const express = require("express");
const connectDB = require("./config/connectDb");
const Person = require("./models/user");
connectDB();

const app = express();

const arrayOfPeople = async () => {
  try {
    Person.create([
      {
        name: "nawres",
        age: 30,
        favoriteFoods: ["m9loub", "rozz"],
      },
      {
        name: "ahlm",
        age: 35,
        favoriteFoods: ["m9loub", "rozz"],
      },
      {
        name: "abs",
        age: 32,
        favoriteFoods: ["m9loub", "rozz"],
      },
      {
        name: "youssef",
        age: 27,
        favoriteFoods: ["roz", "pizza"],
      },
      {
        name: "sourour",
        age: 26,
        favoriteFoods: ["mechoui", "7out"],
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

const findPerson = async (personName) => {
  try {
    const perfind = await Person.find({ name: personName });
    console.log("searchByName", perfind);
  } catch (error) {
    console.log(error);
  }
};
const findOnePerson = (food) => {
  Person.findOne({ favoriteFoods: food }, function (err, per) {
    if (err) {
      console.log(err);
    }
    console.log(per);
  });
};
const SearchById = (personId) => {
  Person.findById({ _id: personId }, (err, per) => {
    if (err) {
      console.log(err);
    }
    console.log(per);
  });
};

const findandedit = (Idp, food) => {
  Person.findById({ _id: Idp }, (err, per) => {
    if (err) {
      console.log(err);
    } else {
      per.favoriteFoods.push(food);
      per.save();
      console.log(per);
    }


});
};

const findandupdate = (personName, ageup) => {
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageup } },
    { new: true },
    (err, per) => {
      if (err) {
        console.log(err);
      } else console.log(per);
    }
  );
};

const findandelete = (Idp) => {
  Person.findByIdAndRemove({ _id: Idp }, (err, per) => {
    if (err) {
      console.log(err);
    } else {
      console.log(per);
    }
  });
};

const removeMany = (personName) => {
  Person.remove({ name: personName }, (err, per) => {
    err ? console.log(err) : console.log(per);
  });
};

var queryChain = (food )=>{
    Person.find({ favoriteFoods:food})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((error, per)=> {
        error?
    console.log(error):
    console.log(per)
    });
    };

queryChain(["m9loub", "rozz"])
const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));