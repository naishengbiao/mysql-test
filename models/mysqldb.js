var mysql = require('mysql'),
	settings = require('../settings');

var _pool = mysql.createPool({
				host: settings.db.mysqlhost,
				user: settings.db.mysqluser,
				password: settings.db.mysqlpwd,
				database: settings.db.mysqldb,
				port: settings.db.mysqlport,

				waitForConnections: true,
				connectionLimit: 100
			});

exports.pool = _pool;

function _exec(sqls, data, after)
{
	_pool.getConnection(function (err, conn){
		if (err){
			conn.release();
			console.log(mapId+":"+sql.findById+":"+err);
			return callback(err);
		}

		conn.query(sqls || "",data || [],function(err,rows){
			if (err){
				conn.release();
				return after(err);
			}
			try{
				after(err, rows);
			} catch(err) {
			    console.error(err.name + ":" +err.message);
			}finally{
				conn.release();
			}
		});
	});
}

exports.exec = _exec;