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
	const comments = props.comments;
	const commentItems = comments.map((comment) => <Comment comment={comment} />);

	return (
		<div class="comment-section">
			<div class="comment-form">
				<form>
					<input type="text" placeholder="Write a comment..."/>
				</form>
			</div>
			{commentItems}
		</div>
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
					<CommentSection comments={comments} />
				</div>
			</div>
		</div>
	);
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
	}

	render() {
		const articles = this.state.articles;
		const articleItems = articles.map((article) => <Article article={article}/>);
		return (
			<div class="board container">
				<div class="article-form mycard z-depth-2">
					<h4 href="#article-form" class="modal-trigger">Add your article!</h4>
				</div>
				<div id="article-form" class="article-modal modal">
					<form onSubmit={formSubmit}>
					</form>
				</div>
				{articleItems}
			</div>
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

ReactDOM.render(
	<Board articles={articles} />,
	document.getElementById('1d9f3f0ew')
);