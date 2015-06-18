module.exports = {
	save: 'insert into loc_location(buildid,floorid,mykey,x,y,z,timestamp,uid) values(?,?,?,?,?,?,?,?)',
	findBykey: 'select id,buildid,floorid,mykey,x,y,z,timestamp,uid from loc_location where  uid = ? and (timestamp >= ? and timestamp <= ?)',
	findGroupKey:'select id,buildid,floorid,mykey,x,y,z,timestamp,uid from loc_location'
};

