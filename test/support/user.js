
module.exports = User;

function User(first, last) {
  this.first = first;
  this.last = last;
}

require('../../index').implement(User, function Wrapper (user) {
	this.value = Object.keys(user)
})