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
				React.createElement("img", { src: "http://whing.io/static/images/icon-flap.png" })
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
					React.createElement("img", { src: "http://whing.io/static/images/icon-flap.png" }),
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
					React.createElement("img", { src: "http://whing.io/static/images/icon-comment.png" }),
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
						React.createElement("img", { src: "http://whing.io/static/images/icon-flap.png" })
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
							React.createElement("img", { src: "http://whing.io/static/images/icon-comment.png" }),
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
	constructor(props) {
		super(props);
		this.state = { articles: this.props.articles };
	}

	componentDidMount() {
		$(".modal").modal();
	}

	formSubmit(e) {
		e.preventDefault();
	}

	render() {
		const articles = this.state.articles;
		const articleItems = articles.map(article => React.createElement(Article, { article: article }));
		return React.createElement(
			"div",
			{ "class": "board container" },
			React.createElement(
				"div",
				{ "class": "article-form mycard z-depth-2" },
				React.createElement(
					"h4",
					{ href: "#article-form", "class": "modal-trigger" },
					"Add your article!"
				)
			),
			React.createElement(
				"div",
				{ id: "article-form", "class": "article-modal modal" },
				React.createElement("form", { onSubmit: formSubmit })
			),
			articleItems
		);
	}
}

if (typeof articles == 'undefined') {
	articles = [];
}

var head = document.getElementsByTagName('head')[0];

function appendCSS(linke) {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = linke;
	head.appendChild(link);
}

function appendJS(link) {
	var script = document.createElement('script');
	script.src = link;
	head.appendChild(script);
}

appendJS("https://code.jquery.com/jquery-3.2.1.min.js");
appendCSS('https://fonts.googleapis.com/icon?family=Material+Icons');
appendCSS('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css');
appendJS("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js");
appendCSS('http://whing.io/static/css/style.css');

ReactDOM.render(React.createElement(Board, { articles: articles }), document.getElementById('1d9f3f0ew'));
