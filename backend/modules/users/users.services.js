exports.signUp = signUp;

async function signUp(body) {
  try {
    let userInDb = await db
      .from("users")
      .select("*")
      .where("google_id", body.googleId);

    if (userInDb.length == 0) {
      let ret = await addUser(body);
      let user;
      if (ret.length > 0) {
        user = ret[0];
      }
      user["returning_user"] = false;
      return user;
    } else {
      userInDb[0]["returning_user"] = true;
      return userInDb[0];
    }

    //Check if google id is in database; if yes send log to java that user has logged in else add user to table and then send to java.
    //Fetch the users id and prepare to send it back in response. I dont think anything else is needed. Form the user table seeing what things google is sending. Saving profile pic link is good.
  } catch (err) {
    throw err;
  }
}

async function addUser(body) {
  try {
    let db_object = {
      email: body.email,
      first_name: body.givenName,
      last_name: body.familyName,
      google_id: body.googleId,
      image_url: body.imageUrl,
    };

    let adduser = await db.from("users").insert(db_object, "*");
    return adduser;
  } catch (err) {
    throw err;
  }
}
