const asyncRedis = require("async-redis");

class Redis {
  constructor() {
    this.enable_cache = !!+process.env.ENABLE_CACHE;
    if (this.enable_cache) {
      console.log("Hereee");
      let config = process.env.REDIS_URL || {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: process.env.REDIS_PORT || 6379,
        db: process.env.REDIS_DB_NUMBER || 0,
      };

      this.client = asyncRedis.createClient(config);

      this.client.on("error", (err) => {
        console.error(err);
      });
      console.log("Connected REDIS", `${config.host}:${config.port}`);
    }
  }

  async get(key) {
    if (this.enable_cache) {
      try {
        if (!this.client) throw Error("Client has not been initialised!");
        if (!key || typeof key !== "string") throw Error("Invalid key type!");

        const value = await this.client.get(key);
        return value;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      return null;
    }
  }

  async hgetall(key) {
    if (this.enable_cache) {
      try {
        if (!this.client) throw Error("Client has not been initialised!");
        if (!key || typeof key !== "string") throw Error("Invalid key type!");

        const value = await this.client.hgetall(key);
        return value;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      return null;
    }
  }

  async hmget(hash_key, keys) {
    if (this.enable_cache) {
      try {
        if (!this.client) throw Error("Client has not been initialised!");
        if (
          !hash_key ||
          typeof hash_key !== "string" ||
          !keys ||
          typeof keys !== "object"
        )
          throw Error("Invalid key type!");
        const values = await this.client.hmget(hash_key, keys);

        return values;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      return null;
    }
  }

  async hmset(key, data) {
    if (this.enable_cache) {
      try {
        if (!this.client) throw Error("Client has not been initialised!");
        if (!key || typeof key !== "string") throw Error("Invalid key type!");
        const value = await this.client.hmset(key, data);
        return value;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      return null;
    }
  }

  async getWithFallback(key, fQuery, expiry) {
    if (this.enable_cache) {
      try {
        if (!this.client) throw Error("Client has not been initialised!");
        if (!key || typeof key !== "string") throw Error("Invalid key type!");

        let value = await this.get(key);

        if (!value) {
          value = await fQuery;

          if (value != null) {
            this.set(
              key,
              typeof value === "object" ? JSON.stringify(value) : value,
              expiry
            );
          }
        } else {
          value = JSON.parse(value);
        }

        return value;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      return await fQuery;
    }
  }

  async set(key, value, expiry) {
    if (this.enable_cache) {
      try {
        if (!this.client) throw Error("Client has not been initialised!");
        if (!key || typeof key !== "string") throw Error("Invalid key type!");
        if (!value || typeof value !== "string")
          throw Error("Invalid value type!");

        if (!expiry) await this.client.set(key, value);
        else await this.client.set(key, value, "EX", expiry);

        return true;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      return false;
    }
  }

  async keys(pattern) {
    if (this.enable_cache) {
      try {
        if (!this.client) throw Error("Client has not been initialised!");
        if (!pattern || typeof pattern !== "string")
          throw Error("Invalid pattern type!");

        const keys = await this.client.keys(pattern);
        return keys;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      return null;
    }
  }

  async del(key) {
    if (this.enable_cache) {
      try {
        if (!this.client) throw Error("Client has not been initialised!");
        if (!key || typeof key !== "string")
          throw Error("Invalid pattern type!");

        await this.client.del(key);
        return true;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }

  async flushAll() {
    if (this.enable_cache) {
      try {
        if (!this.client) throw Error("Client has not been initialised!");

        await this.client.flushall();
        return true;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      return false;
    }
  }
  async publish(channel, message) {
    try {
      if (!this.client) throw Error("Client has not been initialised!");

      this.client.publish(channel, JSON.stringify(message));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async rPush(keyname, data, isJson = true) {
    try {
      let result;
      if (!this.client) throw Error("Client has not been initialised!");
      if (isJson) {
        result = await this.client.rpush(keyname, JSON.stringify(data));
      } else {
        result = await this.client.rpush(keyname, data);
      }
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async lPop(keyname) {
    try {
      if (!this.client) throw Error("Client has not been initialised!");

      const value = await this.client.lpop(keyname);
      return value;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async lrange(key, fromIndex = 0, toIndex = -1) {
    if (this.enable_cache) {
      try {
        if (!this.client) throw Error("Client has not been initialised!");
        if (!key || typeof key !== "string")
          throw Error("Invalid pattern type!");

        let poppedData = await this.client.lrange(key, fromIndex, toIndex);
        return poppedData;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }

  async sAdd(keyname, value) {
    try {
      if (!this.client) throw Error("Client has not been initialised!");

      let result = await this.client.sadd(keyname, value);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getMembersOfSet(keyname) {
    try {
      if (!this.client) throw Error("Client has not been initialised!");

      let result = await this.client.smembers(keyname);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async removeMemberOfSet(keyname, member) {
    try {
      if (!this.client) throw Error("Client has not been initialised!");

      let result = await this.client.srem(keyname, member);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

class RedisLogger {
  static async log(message) {
    if (!!+process.env.LOG_CACHE) {
      console.log(`REDIS | ${message}`);
    }
  }
}

module.exports = Redis;
