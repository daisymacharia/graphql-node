const { GraphQLServer } = require("graphql-yoga");

let links = [
	{
		id: "link-0",
		url: "www.howtographql.com",
		description: "Fullstack tutorial for GraphQL"
	},
	{
		id: "link-1",
		url: "www.howtographql.com",
		description: "daisy tutorial for GraphQL"
	},
	{
		id: "link-2",
		url: "www.howtographql.com",
		description: "Macharia tutorial for GraphQL"
	}
];

let idCount = links.length;

// 2
const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: () => links,
		link: args => {
			links.map(link => {
				if (args.id === link.id) {
					return link;
				} else {
					return "the post does not exist";
				}
			});
		}
	},

	Mutation: {
		post: (root, args) => {
			console.log(root, args);
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url
			};
			links.push(link);
			return link;
		},
		updateLink: args => {
			// console.log(root);
			links.map(link => {
				if (args.id === link.id) {
					// console.log(
					// 	(link.description = args.description),
					// 	(link.url = args.url)
					// );
					return (link.description = args.description), (link.url = args.url);
				} else {
					// console.log("the post does not exist");
					return "the post does not exist";
				}
			});
		}
	}
};

// 3
const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
