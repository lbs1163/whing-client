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
	const index = props.index;
	const comments = props.comments;
	const commentSubmit = props.commentSubmit;
	const commentItems = comments.map(comment => React.createElement(Comment, { comment: comment }));
	console.log('asdf', commentSubmit);
	return React.createElement(
		"div",
		{ "class": "comment-section" },
		React.createElement(
			"div",
			{ "class": "comment-form" },
			React.createElement(
				"form",
				{ onSubmit: commentSubmit },
				React.createElement("input", { id: "comment" + index, type: "text", placeholder: "Write a comment..." })
			)
		),
		commentItems
	);
}

class Article extends React.Component {
	componentDidMount() {
		$(".modal").modal();
	}

	render() {
		const index = this.props.index;
		const id = this.props.article.id;
		const author = this.props.article.author;
		const email = this.props.article.email;
		const datetime = this.props.article.datetime;
		const title = this.props.article.title;
		const text = this.props.article.text;
		const image = this.props.article.image;
		const dollars = this.props.article.dollars;
		const comments = this.props.article.comments;
		const flaps = this.props.article.flaps;
		const commentSubmit = this.props.commentSubmit;
		console.log('asdfasdf', commentSubmit);

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
					React.createElement(CommentSection, { index: index, commentSubmit: commentSubmit, comments: comments })
				)
			)
		);
	}
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
		const articles = this.state.articles.slice();
		const newArticle = {
			id: articles.length,
			author: "Beomsu Lim",
			email: "lbs1163@postech.ac.kr",
			datetime: new Date(),
			title: $("input#title").val(),
			text: $("textarea#content").val(),
			image: "https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/17426280_1442991145771343_1426106330517761213_n.jpg?_nc_cat=0&_nc_eui2=AeGBgSdqp5Ppfyu81BIBq5rVCfJWJt5FOfeOxx-q6w3GXTFxrlqAc20DBmR-MefkZDJvQ1PRxMddj3-ZtKLEEVH4Oy2dMP4fq2fVL484uXjcig&oh=21b8a060c3c5817b0606b38881091e11&oe=5B78DF75",
			dollars: 0,
			comments: [],
			flaps: 0
		};
		$("input#title").val('');
		$("textarea#content").val('');
		articles.unshift(newArticle);
		this.setState({ articles: articles });
		$(".modal").modal('close');
	}

	commentSubmit(e, i) {
		e.preventDefault();
		const articles = this.state.articles.slice();
		const text = $("input#comment" + i).val();
		$("input#comment" + i).val('');
		const comment = {
			text: text,
			commentor: "Beomsu Lim",
			email: "lbs1163@postech.ac.kr",
			datetime: new Date(),
			flaps: 0,
			dollars: 0
		};
		articles[i].comments.unshift(comment);
		this.setState({ articles: articles });
	}

	render() {
		const articles = this.state.articles;
		const articleItems = articles.map((article, index) => React.createElement(Article, { index: index, commentSubmit: e => this.commentSubmit(e, index), article: article }));
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
				React.createElement(
					"div",
					{ "class": "container" },
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
						"form",
						{ onSubmit: e => this.formSubmit(e) },
						React.createElement(
							"div",
							{ "class": "input-field" },
							React.createElement("input", { id: "title", type: "text" }),
							React.createElement(
								"label",
								{ "for": "title" },
								"Title"
							)
						),
						React.createElement(
							"div",
							{ "class": "input-field" },
							React.createElement("textarea", { id: "content", type: "text", "class": "materialize-textarea" }),
							React.createElement(
								"label",
								{ "for": "content" },
								"Content"
							)
						),
						React.createElement(
							"div",
							null,
							React.createElement("input", { type: "submit", value: "Write Article", "class": "btn" })
						)
					)
				)
			),
			articleItems
		);
	}
}

if (typeof articles == 'undefined') {
	articles = [];
}

ReactDOM.render(React.createElement(Board, { articles: articles }), document.getElementById('1d9f3f0ew'));
