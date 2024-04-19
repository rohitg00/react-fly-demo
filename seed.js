const users = [
	{
		id: '1',
		name: 'Admin',
		email: 'admin@cerbos.dev',
		password: 'cerbos',
		accessToken: '6f1338f5-5601-41bb-8e17-4e68e225bfb7',
		roles: ['ADMIN'],
	},
	{
		id: '2',
		name: 'Rohit',
		email: 'rohit@cerbos.dev',
		password: 'cerbos',
		accessToken: '6adddf41-13b1-42cb-a9cd-fd3bd7dafaec',
		roles: ['USER'],
	},
	{
		id: '3',
		name: 'Alex',
		email: 'alex@cerbos.dev',
		password: 'cerbos',
		accessToken: '4f5c9ffd-e297-420f-937c-904080fa6507',
		roles: ['USER'],
	},
	// {
	// 	id: '4',
	// 	name: 'User',
	// 	email: 'user@cerbos.dev',
	// 	password: 'cerbos',
	// 	accessToken: '25c39f3b-25dc-49a0-b08f-b2f0bfee19a5',
	// 	roles: [' '],
	// },
];

const courses = [
	{
		id: '1',
		title: 'Linux Foundations',
		price: 49,
		status: 'PUBLISHED',
		authorId: '2',
		author: 'Rohit',
	},
	{
		id: '2',
		title: 'Docker 101',
		price: 79,
		status: 'UNPUBLISHED',
		authorId: '2',
		author: 'Rohit',
	},
	{
		id: '3',
		title: 'JS Foundations',
		price: 29,
		status: 'PUBLISHED',
		authorId: '3',
		author: 'Alex',
	},
	{
		id: '4',
		title: 'React 16',
		price: 49,
		status: 'DEPRECATED',
		authorId: '3',
		author: 'Alex',
	},
];

console.log(`Start seeding ...`);

setTimeout(() => {
	localStorage.setItem('Users', JSON.stringify(users));
	localStorage.setItem('Courses', JSON.stringify(courses));
	console.log(`Seeding finished...!!`);

	console.log('Users[] :', JSON.parse(localStorage.getItem('Users')));
	console.log('Courses[] :', JSON.parse(localStorage.getItem('Courses')));
}, 1000);
