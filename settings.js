module.exports = {
  //数据库
  db:{
    mysqlhost: '192.168.10.111',
    mysqlport: 3306,
    mysqluser: 'cube',
    mysqlpwd: 'cube0734',
    mysqldb: 'cube'
  },
  //namenode
  service:{
    connIp: '192.168.10.106',
    connPort: 9000,
    servName: 'LocationService',
    servId: 10201,
    servIp: '192.168.10.106',
    servPort: 9201,
    pingDur: 3 //(秒)
  },
  //位置服务
  location:{
    threshold:120,
    seconds:5, //5秒检测一次用户心跳
    connmq:'amqp://admin:admin@192.168.10.106', //MQ连接字符串
    connCache:'192.168.10.113:11211', //memcached连接字符串
    DbCacheName:'db_location',  //缓存名称
    Lifetime:10800//以秒为单位

  }
};