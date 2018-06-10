const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function Gravatar(props) {
	const email = props.email;
	const hash = md5(email.trim().toLowerCase());
	const size = props.size;
	return (
		<img
			className="circle"
			src={"https://www.gravatar.com/avatar/"+hash+"?"+"s="+size+"&d=mp"}
		/>
	);
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

	return (
		<span class="grey-text">{text}</span>
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

	return (
		<div class="comment mycard">
			<div class="comment-info-header">
				<Gravatar email={email} size={40}/>
				<p>{commentor} · <Datetime datetime={datetime}/></p>
			</div>
			<p class="text">{text}</p>
			<div class="comment-info-footer">
				<div class="flap-btn">
					<img src="http://whing.io/static/images/icon-flap.png"/>
				</div>
				<span>{numberWithCommas(flaps)}</span>
				<div class="right">
					<i class="material-icons">attach_money</i><span>{numberWithCommas(dollars)}</span>
				</div>
			</div>
		</div>
	);
}

function CommentSection(props) {
	const index = props.index;
	const comments = props.comments;
	const commentSubmit = props.commentSubmit;
	const commentItems = comments.map((comment) => <Comment comment={comment} />);
	console.log('asdf', commentSubmit);
	return (
		<div class="comment-section">
			<div class="comment-form">
				<form onSubmit={commentSubmit}>
					<input id={"comment" + index} type="text" placeholder="Write a comment..."/>
				</form>
			</div>
			{commentItems}
		</div>
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

		return (
			<div class="article row mycard z-depth-2">
				<div class="thumbnail">
					<div class="square-image-wrapper" style={{backgroundImage: 'url(' + image + ')'}}>
					</div>
				</div>
				<div class="article-info">
					<div class="article-info-header">
						<Gravatar email={email} size={40}/>
						<p>{author} · <Datetime datetime={datetime}/></p>
					</div>
					<h4 href={"#article-modal-"+id} class="block-with-text modal-trigger">{title}</h4>
					<p class="truncate grey-text">{text}</p>
					<div class="article-info-footer">
						<div class="article-info-detail">
							<img src="http://whing.io/static/images/icon-flap.png"/><span>{numberWithCommas(flaps)}</span>
						</div>
						<div class="article-info-detail">
							<i class="material-icons">attach_money</i><span>{numberWithCommas(dollars)}</span>
						</div>
						<div class="article-info-detail">
							<img src="http://whing.io/static/images/icon-comment.png"/><span>{numberWithCommas(comments.length)}</span>
						</div>
					</div>
				</div>
				<div id={"article-modal-"+id} class="article-modal modal">
					<div class="modal-content">
						<div>
							<a href="#!" class="modal-close">
								<i class="material-icons">arrow_back</i>
								<span>Back to Board</span>
							</a>
						</div>
						<div class="article-modal-header">
							<Gravatar email={email} size={47}/>
							<p>{author} · <Datetime datetime={datetime}/></p>
							<p class="grey-text">Lv. 7</p>
						</div>
						<h3>{title}</h3>
						<div class="divider"></div>
						<p class="text">{text}</p>
						<div class="article-modal-footer">
							<div class="flap-btn flap-btn-large">
								<img src="http://whing.io/static/images/icon-flap.png"/>
							</div>
							<span>{numberWithCommas(flaps)}</span>
							<div class="right">
								<div class="article-info-detail">
									<i class="material-icons">attach_money</i>
									<p>{numberWithCommas(dollars)}</p>
								</div>
								<div class="article-info-detail">
									<img src="http://whing.io/static/images/icon-comment.png"/>
									<p>{numberWithCommas(comments.length)}</p>
								</div>
							</div>
						</div>
						<CommentSection index={index} commentSubmit={commentSubmit} comments={comments} />
					</div>
				</div>
			</div>
		);
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {articles: this.props.articles};
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
			flaps: 0,
		};
		$("input#title").val('');
		$("textarea#content").val('');
		articles.unshift(newArticle);
		this.setState({articles: articles});
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
			dollars: 0,
		};
		articles[i].comments.unshift(comment);
		this.setState({articles: articles});
	}

	render() {
		const articles = this.state.articles;
		const articleItems = articles.map((article, index) => <Article index={index} commentSubmit={(e) => this.commentSubmit(e, index)} article={article}/>);
		return (
			<div class="board container">
				<div class="article-form mycard z-depth-2">
					<h4 href="#article-form" class="modal-trigger">Add your article!</h4>
				</div>
				<div id="article-form" class="article-modal modal">
					<div class="container">
						<div>
							<a href="#!" class="modal-close">
								<i class="material-icons">arrow_back</i>
								<span>Back to Board</span>
							</a>
						</div>
						<form onSubmit={(e) => this.formSubmit(e)}>
							<div class="input-field">
								<input id="title" type="text" />
								<label for="title">Title</label>
							</div>
							<div class="input-field">
								<textarea id="content" type="text" class="materialize-textarea"></textarea>
								<label for="content">Content</label>
							</div>
							<div>
								<input type="submit" value="Write Article" class="btn"/>
							</div>
						</form>
					</div>
				</div>
				{articleItems}
			</div>
		);
	}
}

if (typeof articles == 'undefined') {
	articles = [];
}

ReactDOM.render(
	<Board articles={articles} />,
	document.getElementById('1d9f3f0ew')
);