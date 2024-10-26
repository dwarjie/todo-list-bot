const findUser = require("../../utils/findUser");

module.exports = async (Collection, id) => {
	const userCollection = await findUser(Collection, id);

	if (!userCollection) return [];

	return userCollection.task;
};
