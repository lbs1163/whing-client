const numberWithCommas = x => {
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
};

function Gravatar(props) {
	const email = props.email;
	const hash = md5(email.trim().toLowerCase());
	const size = props.size;
	return React.createElement("img", {
		className: "circle",
		src: "https://www.gravatar.com/avatar/" + hash + "?" + "s=" + size + "&d=mp"
	});
}

function Datetime(props) {
	const datetime = props.datetime;
	const now = new Date();
	let text;

	if (datetime.getFullYear() != now.getFullYear()) {
		const years = now.getFullYear() - datetime.getFullYear();
		text = '' + years + ' year' + (years == 1 ? ' ' : 's ') + 'ago';
	} else if (datetime.getMonth() != now.getMonth()) {
		const months = now.getMonth() - datetime.getMonth();
		text = '' + months + ' month' + (months == 1 ? ' ' : 's ') + 'ago';
	} else if (datetime.getDate() != now.getDate()) {
		const days = now.getDate() - datetime.getDate();
		text = '' + days + ' day' + (days == 1 ? ' ' : 's ') + 'ago';
	} else if (datetime.getHours() != now.getHours()) {
		const hours = now.getHours() - datetime.getHours();
		text = '' + hours + ' hour' + (hours == 1 ? ' ' : 's ') + 'ago';
	} else if (datetime.getMinutes() != now.getMinutes()) {
		const minutes = now.getMinutes() - datetime.getMinutes();
		text = '' + minutes + ' minute' + (minutes == 1 ? ' ' : 's ') + 'ago';
	} else if (datetime.getSeconds() != now.getSeconds()) {
		const seconds = now.getSeconds() - datetime.getSeconds();
		text = '' + seconds + ' second' + (seconds == 1 ? ' ' : 's ') + 'ago';
	} else {
		text = 'now';
	}

	return React.createElement(
		"span",
		{ "class": "grey-text" },
		text
	);
}

function Comment(props) {
	const id = props.comment.id;
	const email = props.comment.email;
	const text = props.comment.text;
	const commentor = props.comment.commentor;
	const datetime = props.comment.datetime;
	const flaps = props.comment.flaps;
	const dollars = props.comment.dollars;

	return React.createElement(
		"div",
		{ "class": "comment mycard" },
		React.createElement(
			"div",
			{ "class": "comment-info-header" },
			React.createElement(Gravatar, { email: email, size: 40 }),
			React.createElement(
				"p",
				null,
				commentor,
				" \xB7 ",
				React.createElement(Datetime, { datetime: datetime })
			)
		),
		React.createElement(
			"p",
			{ "class": "text" },
			text
		),
		React.createElement(
			"div",
			{ "class": "comment-info-footer" },
			React.createElement(
				"div",
				{ "class": "flap-btn" },
				React.createElement("img", { src: "/static/images/icon-flap.png" })
			),
			React.createElement(
				"span",
				null,
				numberWithCommas(flaps)
			),
			React.createElement(
				"div",
				{ "class": "right" },
				React.createElement(
					"i",
					{ "class": "material-icons" },
					"attach_money"
				),
				React.createElement(
					"span",
					null,
					numberWithCommas(dollars)
				)
			)
		)
	);
}

function CommentSection(props) {
	const comments = props.comments;
	const commentItems = comments.map(comment => React.createElement(Comment, { comment: comment }));

	return React.createElement(
		"div",
		{ "class": "comment-section" },
		React.createElement(
			"div",
			{ "class": "comment-form" },
			React.createElement(
				"form",
				null,
				React.createElement("input", { type: "text", placeholder: "Write a comment..." })
			)
		),
		commentItems
	);
}

function Article(props) {
	const id = props.article.id;
	const author = props.article.author;
	const email = props.article.email;
	const datetime = props.article.datetime;
	const title = props.article.title;
	const text = props.article.text;
	const image = props.article.image;
	const dollars = props.article.dollars;
	const comments = props.article.comments;
	const flaps = props.article.flaps;

	return React.createElement(
		"div",
		{ "class": "article row mycard z-depth-2" },
		React.createElement(
			"div",
			{ "class": "thumbnail" },
			React.createElement("div", { "class": "square-image-wrapper", style: { backgroundImage: 'url(' + image + ')' } })
		),
		React.createElement(
			"div",
			{ "class": "article-info" },
			React.createElement(
				"div",
				{ "class": "article-info-header" },
				React.createElement(Gravatar, { email: email, size: 40 }),
				React.createElement(
					"p",
					null,
					author,
					" \xB7 ",
					React.createElement(Datetime, { datetime: datetime })
				)
			),
			React.createElement(
				"h4",
				{ href: "#article-modal-" + id, "class": "block-with-text modal-trigger" },
				title
			),
			React.createElement(
				"p",
				{ "class": "truncate grey-text" },
				text
			),
			React.createElement(
				"div",
				{ "class": "article-info-footer" },
				React.createElement(
					"div",
					{ "class": "article-info-detail" },
					React.createElement("img", { src: "/static/images/icon-flap.png" }),
					React.createElement(
						"span",
						null,
						numberWithCommas(flaps)
					)
				),
				React.createElement(
					"div",
					{ "class": "article-info-detail" },
					React.createElement(
						"i",
						{ "class": "material-icons" },
						"attach_money"
					),
					React.createElement(
						"span",
						null,
						numberWithCommas(dollars)
					)
				),
				React.createElement(
					"div",
					{ "class": "article-info-detail" },
					React.createElement("img", { src: "/static/images/icon-comment.png" }),
					React.createElement(
						"span",
						null,
						numberWithCommas(comments.length)
					)
				)
			)
		),
		React.createElement(
			"div",
			{ id: "article-modal-" + id, "class": "article-modal modal" },
			React.createElement(
				"div",
				{ "class": "modal-content" },
				React.createElement(
					"div",
					null,
					React.createElement(
						"a",
						{ href: "#!", "class": "modal-close" },
						React.createElement(
							"i",
							{ "class": "material-icons" },
							"arrow_back"
						),
						React.createElement(
							"span",
							null,
							"Back to Board"
						)
					)
				),
				React.createElement(
					"div",
					{ "class": "article-modal-header" },
					React.createElement(Gravatar, { email: email, size: 47 }),
					React.createElement(
						"p",
						null,
						author,
						" \xB7 ",
						React.createElement(Datetime, { datetime: datetime })
					),
					React.createElement(
						"p",
						{ "class": "grey-text" },
						"Lv. 7"
					)
				),
				React.createElement(
					"h3",
					null,
					title
				),
				React.createElement("div", { "class": "divider" }),
				React.createElement(
					"p",
					{ "class": "text" },
					text
				),
				React.createElement(
					"div",
					{ "class": "article-modal-footer" },
					React.createElement(
						"div",
						{ "class": "flap-btn flap-btn-large" },
						React.createElement("img", { src: "/static/images/icon-flap.png" })
					),
					React.createElement(
						"span",
						null,
						numberWithCommas(flaps)
					),
					React.createElement(
						"div",
						{ "class": "right" },
						React.createElement(
							"div",
							{ "class": "article-info-detail" },
							React.createElement(
								"i",
								{ "class": "material-icons" },
								"attach_money"
							),
							React.createElement(
								"p",
								null,
								numberWithCommas(dollars)
							)
						),
						React.createElement(
							"div",
							{ "class": "article-info-detail" },
							React.createElement("img", { src: "/static/images/icon-comment.png" }),
							React.createElement(
								"p",
								null,
								numberWithCommas(comments.length)
							)
						)
					)
				),
				React.createElement(CommentSection, { comments: comments })
			)
		)
	);
}

class Board extends React.Component {
	componentDidMount() {
		$(".article-modal.modal").modal();
	}

	render() {
		const articles = this.props.articles;
		const articleItems = articles.map(article => React.createElement(Article, { article: article }));
		return React.createElement(
			"div",
			{ "class": "board container" },
			articleItems
		);
	}
}

var articles = [{
	id: 1,
	author: "Soojin Lim",
	email: "lbs1163@postech.ac.kr",
	datetime: new Date(2018, 5, 8, 22, 18, 0, 0),
	title: "EOS, the most most most most most most most most most most most most most most most most most most most most most most most powerful infrastructure for decentralized apps is the global technology and quality leader",
	text: "Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other. Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other. Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other. Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other. Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other. Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other. Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other.",
	image: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&h=350",
	dollars: 13221,
	comments: [{
		id: 1,
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
		commentor: "Soojin Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 3, 22, 18, 0, 0),
		flaps: 534,
		dollars: 43.121
	}, {
		id: 2,
		text: 'It was very useful!',
		commentor: "Beomsu Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 10, 0, 55, 0, 0),
		flaps: 321,
		dollars: 25.123
	}],
	flaps: 42
}, {
	id: 2,
	author: "Giyoung Ju",
	email: "lbs1163@postech.ac.kr",
	datetime: new Date(2018, 5, 8, 21, 18, 0, 0),
	title: "Introducing Whing, the world first blockchain-based website plugin with perfect reward system for authors",
	text: "Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other.",
	image: "https://images.pexels.com/photos/39517/rose-flower-blossom-bloom-39517.jpeg?cs=srgb&dl=bloom-blossom-flora-39517.jpg&fm=jpg",
	dollars: 43121,
	comments: [{
		id: 3,
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
		commentor: "Soojin Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 3, 22, 18, 0, 0),
		flaps: 534,
		dollars: 43.121
	}, {
		id: 4,
		text: 'It was very useful!',
		commentor: "Beomsu Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 10, 0, 55, 0, 0),
		flaps: 321,
		dollars: 25.123
	}],
	flaps: 42
}, {
	id: 3,
	author: "Bumsoo Lim",
	email: "lbs1163@postech.ac.kr",
	datetime: new Date(2018, 5, 7, 22, 18, 0, 0),
	title: "Blockchain is the world's leading software platform for digital assets. Offering the largest production",
	text: "Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other.",
	image: "https://files.allaboutbirds.net/wp-content/uploads/2015/06/prow-featured.jpg",
	dollars: 53412,
	comments: [{
		id: 5,
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
		commentor: "Soojin Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 3, 22, 18, 0, 0),
		flaps: 534,
		dollars: 43.121
	}, {
		id: 6,
		text: 'It was very useful!',
		commentor: "Beomsu Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 10, 0, 55, 0, 0),
		flaps: 321,
		dollars: 25.123
	}],
	flaps: 42
}, {
	id: 4,
	author: "Giyoung Ju",
	email: "lbs1163@postech.ac.kr",
	datetime: new Date(2018, 5, 3, 22, 18, 0, 0),
	title: "EOS, the most powerful infrastructure for decentralized apps is the global technology and quality leader",
	text: "Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other.",
	image: "http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/24832-istock-698876630.jpg?itok=g-ZBr_L8&resize=1100x619",
	dollars: 41421,
	comments: [{
		id: 7,
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
		commentor: "Soojin Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 3, 22, 18, 0, 0),
		flaps: 534,
		dollars: 43.121
	}, {
		id: 8,
		text: 'It was very useful!',
		commentor: "Beomsu Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 10, 0, 55, 0, 0),
		flaps: 321,
		dollars: 25.123
	}],
	flaps: 42
}, {
	id: 5,
	author: "Giyoung Ju",
	email: "lbs1163@postech.ac.kr",
	datetime: new Date(2018, 4, 8, 22, 18, 0, 0),
	title: "Introducing Whing, the world first blockchain-based website plugin with perfect reward system for authors",
	text: "Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other.",
	image: "http://www.krugerpark.co.za/images/1-lion-charge-gc590a.jpg",
	dollars: 53412,
	comments: [{
		id: 9,
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
		commentor: "Soojin Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 3, 22, 18, 0, 0),
		flaps: 534,
		dollars: 43.121
	}, {
		id: 10,
		text: 'It was very useful!',
		commentor: "Beomsu Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 10, 0, 55, 0, 0),
		flaps: 321,
		dollars: 25.123
	}],
	flaps: 42
}, {
	id: 6,
	author: "Byeongguk",
	email: "lbs1163@postech.ac.kr",
	datetime: new Date(2017, 4, 8, 22, 18, 0, 0),
	title: "What is block chain? A distributed ledger with trust",
	text: "Whing is world's first blockchain-based bulletinboard hub. Whing is designed to revolutionize old centralized community and overcome the limitation of blockchain communities all around the world. Anyone can easily apply a reward system to their site by installing our plug-in. Through Whing, users can be rewarded as they write articles and vote each other.",
	image: "https://cdn.britannica.com/700x450/10/152310-004-AE62B6B8.jpg",
	dollars: 13221,
	comments: [{
		id: 11,
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
		commentor: "Soojin Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 3, 22, 18, 0, 0),
		flaps: 534,
		dollars: 43.121
	}, {
		id: 12,
		text: 'It was very useful!',
		commentor: "Beomsu Lim",
		email: "lbs1163@postech.ac.kr",
		datetime: new Date(2018, 5, 10, 0, 55, 0, 0),
		flaps: 321,
		dollars: 25.123
	}],
	flaps: 42
}];

ReactDOM.render(React.createElement(Board, { articles: articles }), document.getElementById('asdfasdfasdf'));
