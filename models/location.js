var db = require('./mysqldb'),
	sql = require('./sql_location');

function Location(location) {
	this.id = location.id;
	this.buildid = location.buildid;
	this.floorid = location.floorid;
	this.key = location.key;
	this.x = location.x;
	this.y = location.y;
	this.z = location.z;
	this.timestamp = location.timestamp;
	this.uid = location.uid;

}


module.exports = Location;

Location.prototype.save = function save(callback) {
	var location = {
		buildid: this.buildid,
		floorid: this.floorid,
		key: this.key,
		x: this.x,
		y: this.y,
		z: this.z,
		timestamp: this.timestamp,
		uid: this.uid
	};
	db.pool.getConnection(function(err, conn) {
		//console.log(conn);
		if (err) {
			if (conn) {
				conn.release();
			}
			return callback(err);
		}
		conn.query(sql.save, [location.buildid, location.floorid, location.key, location.x, location.y, location.z, location.timestamp, location.uid], function(err) {
			if (err) {
				conn.release();
				return callback(err);
			}
			conn.release();
			return callback(err, 'true');
		});
	});
}


Location.getBy = function getBy(uid, timeone, timetwo, callback) {
	db.pool.getConnection(function(err, conn) {
		if (err) {
			if (conn) {
				conn.release();
			}
			return callback(err);
		}
		conn.query(sql.findBykey, [uid, timeone, timetwo], function(err, rows) {
			if (err) {
				conn.release();
				return callback(err);
			}
			var list = [];
			for (var i in rows) {
				list[i] = {
					id: rows[i].id.toString(),
					buildid: rows[i].buildid,
					floorid: rows[i].floorid,
					key: rows[i].key,
					x: rows[i].x == null ? "0" : rows[i].x.toString(),
					y: rows[i].y == null ? "0" : rows[i].y.toString(),
					z: rows[i].z == null ? "0" : rows[i].z.toString(),
					timestamp: rows[i].timestamp,
					uid: rows[i].uid.toString()
				};


			}

			conn.release();
			return callback(err, list);
		});
	});
}



Location.getall = function getall(callback) {
	db.pool.getConnection(function(err, conn) {
		if (err) {
			if (conn) {
				conn.release();
			}
			return callback(err);
		}
		conn.query(sql.findGroupKey, function(err, rows) {
			if (err) {
				conn.release();
				return callback(err);
			}
			var list = [];
			for (var i in rows) {
				list[i] = {
					id: rows[i].id.toString(),
					buildid: rows[i].buildid,
					floorid: rows[i].floorid,
					key: rows[i].key,
					x: rows[i].x == null ? "0" : rows[i].x.toString(),
					y: rows[i].y == null ? "0" : rows[i].y.toString(),
					z: rows[i].z == null ? "0" : rows[i].z.toString(),
					timestamp: rows[i].timestamp,
					uid: rows[i].uid.toString()
				};

			}

			conn.release();
			return callback(err, list);
		});
	});
}