module.exports = async (Collection, id) => {
	const user = await Collection.findOne({ user_id: id });

	return user;
};
