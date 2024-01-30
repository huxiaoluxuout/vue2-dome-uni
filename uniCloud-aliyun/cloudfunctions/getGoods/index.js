'use strict';
const db =uniCloud.database();

exports.main = async (event, context) => {
	// console.log(event)
	let {size}=event
	let res = await db.collection('goods').limit(size).get()
	
	return res
};
