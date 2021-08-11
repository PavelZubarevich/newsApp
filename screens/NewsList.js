import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { NewsItem, NewsModal, Header } from "../components";

const testData = {
	status: "ok",
	totalResults: 301149,
	articles: [
		{
			source: {
				id: "1",
				name: "New York Times",
			},
			author: "Charanna Alexander",
			title: "Love Letter: Embracing Your Sensual Side at Any Age",
			description: "And: falling in love on Zoom.",
			url: "https://www.nytimes.com/2021/06/25/style/love-letter-newsletter-embracing-your-sensual-side-at-any-age.html",
			urlToImage: "https://static01.nyt.com/images/2019/09/25/fashion/loveletter/loveletter-facebookJumbo-v4.png",
			publishedAt: "2021-06-25T20:36:36Z",
			content:
				"Because of pandemic restrictions, their courtship consisted of Zoom calls, Zoom movies, Zoom candlelit dinners we did everything Zoom, Mr. Syphax said. After two months of virtual dating, they finall… [+405 chars]",
		},
		{
			source: {
				id: "engadget",
				name: "Engadget",
			},
			author: "https://www.engadget.com/about/editors/kris-holt",
			title: "Steven Spielberg will produce movies for Netflix",
			description: "It's unclear whether he'll direct any of them, though..",
			url: "https://www.engadget.com/steven-spielberg-netflix-ambiln-175031862.html",
			urlToImage: "https://s.yimg.com/os/creatr-uploaded-images/2021-06/a2e4bdc0-d2b7-11eb-9f63-b454c169cfb1",
			publishedAt: "2021-06-21T17:50:31Z",
			content:
				"Steven Spielberg's production company, Amblin, has signed a deal\r\n with Netflix\r\n to make \"multiple new feature films per year\" for the streaming service. It's a bit of a surprising move, given some … [+2253 chars]",
		},
		{
			source: {
				id: "techcrunch",
				name: "TechCrunch",
			},
			author: "Sarah Perez",
			title: "Shopify expands its one-click checkout, Shop Pay, to any merchant on Facebook or Google",
			description:
				"E-commerce platform Shopify announced this morning its one-click checkout service known as Shop Pay will become available to any U.S. merchant that sells on Facebook or Google — even if they don’t use Shopify’s software to power their online stores. That make…",
			url: "http://techcrunch.com/2021/06/15/shopify-expands-its-one-click-checkout-shop-pay-to-any-merchant-on-facebook-or-google/",
			urlToImage: "https://techcrunch.com/wp-content/uploads/2021/06/shop-pay.png?w=762",
			publishedAt: "2021-06-15T14:35:23Z",
			content:
				"E-commerce platform Shopify announced this morning its one-click checkout service known as Shop Pay will become available to any U.S. merchant that sells on Facebook or Google — even if they don’t us… [+3834 chars]",
		},
		{
			source: {
				id: null,
				name: "Gizmodo.com",
			},
			author: "Cheryl Eddy",
			title: "French Horror Movie Kandisha's First Trailer Reminds Us That Demons Are Scary in Any Language",
			description:
				"Got a bad situation in your life? Why not summon a demon to help resolve your problems? It’s a great idea... until the entity you’ve called upon reveals it’s got an agenda far beyond your worst nightmares. This is the awful realization that hits the trio of f…",
			url: "https://gizmodo.com/french-horror-movie-kandishas-first-trailer-reminds-us-1847260407",
			urlToImage:
				"https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/035ece413b9acdcf753599e7fbc05def.jpg",
			publishedAt: "2021-07-12T17:00:00Z",
			content:
				"Got a bad situation in your life? Why not summon a demon to help resolve your problems? Its a great idea... until the entity youve called upon reveals its got an agenda far beyond your worst nightmar… [+1740 chars]",
		},
		{
			source: {
				id: null,
				name: "Lifehacker.com",
			},
			author: "Elizabeth Yuko",
			title: "How to Tell If Your Chicken Is Part of the 9 Million Pound Recall",
			description:
				"Fully cooked, ready-to-eat chicken may be a convenient way to add some protein to a meal, but if you have any in your fridge right now, you’re going to want to check the label. Read more...",
			url: "https://lifehacker.com/how-to-tell-if-your-chicken-is-part-of-the-9-million-po-1847263547",
			urlToImage:
				"https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/e6ac956fb0589fc03fee7b1295d764fe.jpg",
			publishedAt: "2021-07-10T14:00:00Z",
			content:
				"Fully cooked, ready-to-eat chicken may be a convenient way to add some protein to a meal, but if you have any in your fridge right now, youre going to want to check the label. \r\nThats because almost … [+2541 chars]",
		},
		{
			source: {
				id: "wired",
				name: "Wired",
			},
			author: "Angela Watercutter",
			title: "Loki Has Always Been Marvel’s Most Queer Character",
			description:
				"The character’s identity—rooted in sexually fluid Norse mythology—goes far beyond any form of queerness TV has ever seen before.",
			url: "https://www.wired.com/story/loki-marvel-queer-character/",
			urlToImage:
				"https://media.wired.com/photos/60ca375fa069f13cc7c03468/191:100/w_1280,c_limit/Culture_Loki_ARC-101-03065.jpg",
			publishedAt: "2021-06-21T11:00:00Z",
			content:
				"In the second episode of Disney+s latest Marvel series, Loki, the title character pulls off his most illustrious trick yet: meeting himself. Working under the auspices of the Time Variance Authorityt… [+3980 chars]",
		},
		{
			source: {
				id: "bbc-news",
				name: "BBC News",
			},
			author: null,
			title: "Nato: Cyber attacks 'as serious as any other attacks' to allies",
			description:
				"Jens Stoltenberg told the BBC that Nato could launch military assaults in respond to cyber attacks.",
			url: "https://www.bbc.co.uk/news/av/world-57478561",
			urlToImage:
				"https://ichef.bbci.co.uk/news/1024/branded_news/564C/production/_118929022_6126a41e-f713-4e07-b805-f4eb3a5f0388.jpg",
			publishedAt: "2021-06-14T23:16:03Z",
			content:
				'The secretary general of Nato has warned cyber-attacks could result in a military response from its allies.\r\nJens Stoltenberg told BBC Newsnight an attack in cyberspace "can be as damaging and as dan… [+366 chars]',
		},
		{
			source: {
				id: null,
				name: "Lifehacker.com",
			},
			author: "Sam Blum",
			title: "How to Tell If a Plant Is Toxic to Pets Before You Buy It",
			description:
				"Houseplants are a great way to decorate and keeping them can even have psychological benefits—but to a curious cat or dog, many plants could also pose a major health risk. So before you bring just any plant home, you should acquaint yourself with the telltale…",
			url: "https://lifehacker.com/how-to-tell-if-a-plant-is-toxic-to-pets-before-you-buy-1847124197",
			urlToImage:
				"https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/e91fc9d048b40e59a36b478c46ec5149.jpg",
			publishedAt: "2021-06-21T14:45:00Z",
			content:
				"Houseplants are a great way to decorate and keeping them can even have psychological benefitsbut to a curious cat or dog, many plants could also pose a major health risk. So before you bring just any… [+3280 chars]",
		},
		{
			source: {
				id: null,
				name: "Lifehacker.com",
			},
			author: "Beth Skwarecki",
			title: "Why Your Tracking App Thinks Your Cardio Fitness Has Suddenly Gotten Worse",
			description:
				"If you’ve gotten used to monitoring your “cardio fitness” score on your Fitbit, Garmin, Apple Health, or any other activity tracker or app, you may have noticed that the score has dropped recently—or perhaps not gone up as much as you would have expected. But…",
			url: "https://lifehacker.com/why-your-tracking-app-thinks-your-cardio-fitness-has-su-1847244588",
			urlToImage:
				"https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/a67135e0b8e128d48131f5ba935001bc.jpg",
			publishedAt: "2021-07-07T18:30:00Z",
			content:
				"If youve gotten used to monitoring your cardio fitness score on your Fitbit, Garmin, Apple Health, or any other activity tracker or app, you may have noticed that the score has dropped recentlyor per… [+3256 chars]",
		},
		{
			source: {
				id: null,
				name: "Lifehacker.com",
			},
			author: "Meghan Moravcik Walbert",
			title: "How to Detox Kids From Their Screens",
			description:
				"When the pandemic hit last year, the first thing many parents did was abandon any rules they had in place about screen time. It’s not because the pandemic made us lazy parents; it’s because so many of us suddenly needed to work in the same spaces where our ch…",
			url: "https://lifehacker.com/how-to-detox-kids-from-their-screens-1847103017",
			urlToImage:
				"https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/d9d5fd835b3d5e135074f3afe4562035.jpg",
			publishedAt: "2021-06-16T14:00:00Z",
			content:
				"When the pandemic hit last year, the first thing many parents did was abandon any rules they had in place about screen time. Its not because the pandemic made us lazy parents; its because so many of … [+6717 chars]",
		},
		{
			source: {
				id: null,
				name: "Slashdot.org",
			},
			author: "EditorDavid",
			title: "'By 2030, You Won't Own Any Gadgets'",
			description:
				'"By 2030, technology will have advanced to the point that even the idea of owning objects might be obsolete," argues a thought-provoking new piece by Gizmodo\'s consumer tech reporter:\n\nBack in 2016, the World Economic Forum released a Facebook video with eigh…',
			url: "https://news.slashdot.org/story/21/07/10/0120236/by-2030-you-wont-own-any-gadgets",
			urlToImage: "https://a.fsdn.com/sd/topics/drm_64.png",
			publishedAt: "2021-07-10T21:34:00Z",
			content:
				"Back in 2016, the World Economic Forum released a Facebook video with eight predictions it had for the world in 2030. \"You'll own nothing. And you'll be happy,\" it says. \"Whatever you want, you'll re… [+2458 chars]",
		},
		{
			source: {
				id: "reuters",
				name: "Reuters",
			},
			author: "Reuters",
			title: "Japan's Aso: peaceful solution desirable for any Taiwan contingency - Reuters",
			description:
				"Japan's deputy prime minister Taro Aso said on Tuesday that any contingency over Taiwan should be resolved through dialogue, when asked about his earlier remarks that Japan, along with the United States, would defend Taiwan in case of crisis.",
			url: "https://www.reuters.com/world/asia-pacific/japans-aso-peaceful-solution-desirable-any-taiwan-contingency-2021-07-06/",
			urlToImage:
				"https://www.reuters.com/resizer/sGnhi0KCd0v5AbGW30jtogLKpVM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/GQNJDFJSRJPIDH2W5JSDYA7F4U.jpg",
			publishedAt: "2021-07-06T03:08:00Z",
			content:
				"Japan's Deputy Prime Minister and Finance Minister Taro Aso, wearing a protective face mask, delivers his policy speech at the opening of an ordinary session of the parliament in Tokyo, Japan January… [+720 chars]",
		},
		{
			source: {
				id: "reuters",
				name: "Reuters",
			},
			author: "Reuters Editorial",
			title: "Space travel insurance? Even Bezos can't get any - Reuters",
			description:
				"When Amazon boss Jeff Bezos blasts off into space next month he probably won't have any insurance. Financial industry experts say there's just no way to get cover for space tourism just yet.",
			url: "https://www.reuters.com/video/watch/idP6QF?now=true",
			urlToImage: "https://ajo.prod.reuters.tv/api/v2/img/60d4894de4b085d3b6c3475e-1624541517541?location=LANDSCAPE",
			publishedAt: "2021-06-24T14:36:22Z",
			content:
				"Posted \r\nWhen Amazon boss Jeff Bezos blasts off into space next month he probably won't have any insurance. Financial industry experts say there's just no way to get cover for space tourism just yet.",
		},
		{
			source: {
				id: "reuters",
				name: "Reuters",
			},
			author: "Reuters Editorial",
			title: "Space travel insurance? Even Bezos can't get any - Reuters",
			description:
				"When Amazon boss Jeff Bezos blasts off into space next month he probably won't have any insurance. Financial industry experts say there's just no way to get cover for space tourism just yet. Julian Satterthwaite reports.",
			url: "https://www.reuters.com/video/watch/idOVEIRMT8R",
			urlToImage: "https://static.reuters.com/resources/r/?d=20210624&i=OVEIRMT8R&r=OVEIRMT8R&t=2",
			publishedAt: "2021-06-24T14:22:43Z",
			content:
				"Posted \r\nWhen Amazon boss Jeff Bezos blasts off into space next month he probably won't have any insurance. Financial industry experts say there's just no way to get cover for space tourism just yet.… [+29 chars]",
		},
		{
			source: {
				id: "bbc-news",
				name: "BBC News",
			},
			author: "https://www.facebook.com/bbcnews",
			title: "Chris Brown accused of hitting woman in LA",
			description: "Police will now consider whether to bring any charges against the R&B star.",
			url: "https://www.bbc.co.uk/news/newsbeat-57568114",
			urlToImage:
				"https://ichef.bbci.co.uk/news/1024/branded_news/134E9/production/_119018097_gettyimages-1154997184.jpg",
			publishedAt: "2021-06-23T08:59:43Z",
			content:
				"image copyrightGetty Images\r\nimage captionThe alleged victim told police Chris Brown hit her after an argument\r\nChris Brown has been accused of hitting a woman after a row in Los Angeles.\r\nThe R&amp;… [+1224 chars]",
		},
		{
			source: {
				id: null,
				name: "Android Central",
			},
			author: "Jeramy Johnson",
			title: "Did any Prime Day deals slip through your fingers?",
			description:
				"Prime Day victory stories are great, but we want to hear about the deals that got away.\n\n\n\nAmazon's annual Prime Day event is always an exciting experience with tons of opportunities for customers to save money on their favorite products and services, and thi…",
			url: "https://www.androidcentral.com/what-item-did-you-hope-get-sale-prime-day-missed-out",
			urlToImage:
				"https://www.androidcentral.com/sites/androidcentral.com/files/styles/large/public/article_images/2015/02/amazon-prime-box-angle-hero.jpg",
			publishedAt: "2021-06-24T12:28:07Z",
			content:
				"Amazon's annual Prime Day event is always an exciting experience with tons of opportunities for customers to save money on their favorite products and services, and this year was certainly no differe… [+1367 chars]",
		},
		{
			source: {
				id: null,
				name: "New York Times",
			},
			author: "Kevin Draper, Andrew Keh, Tariq Panja and Motoko Rich",
			title: "Why Are the Tokyo Olympics Still Happening?",
			description:
				"Wondering why the Tokyo Games haven’t been canceled? The answer lies in billions of dollars, years of work and thousands of athletes who can’t wait any longer.",
			url: "https://www.nytimes.com/2021/06/21/sports/olympics/tokyo-olympics-happening-why.html",
			urlToImage:
				"https://static01.nyt.com/images/2021/06/22/business/21Sports-Olympics-numbers1-illo-print/21Sports-Olympics-numbers-facebookJumbo-v2.jpg",
			publishedAt: "2021-06-21T21:26:51Z",
			content:
				"The Olympic Games have always been about numbers. After all, a motto of Citius, Altius, Fortius faster, higher, stronger doesnt mean much without seconds, meters and pounds. How fast? How high? How s… [+6059 chars]",
		},
		{
			source: {
				id: null,
				name: "New York Times",
			},
			author: "Derrick Bryson Taylor",
			title: "Rescue Teams Respond to a Building Collapse in Miami",
			description:
				"The building, in the Surfside area of Miami, appeared to be partially collapsed. It is unclear if there are any deaths or injuries.",
			url: "https://www.nytimes.com/2021/06/24/us/miami-surfside-building-collapse.html",
			urlToImage:
				"https://static01.nyt.com/images/2021/06/24/world/24xp-surfside-01/24xp-surfside-01-facebookJumbo.jpg",
			publishedAt: "2021-06-24T09:01:29Z",
			content:
				"Dozens of fire rescue units responded to what the Miami-Dade Fire Rescue department described as a partial building collapse in Miami early Thursday.\r\nThe Miami Beach Police Department said the build… [+560 chars]",
		},
		{
			source: {
				id: null,
				name: "New York Times",
			},
			author: "Alex Traub",
			title: "Terry Donahue, Who Led U.C.L.A. to Bowl Victories, Dies at 77",
			description:
				"Over 20 years, he had more wins than any football coach in the school’s history, including seven consecutive bowl championships.",
			url: "https://www.nytimes.com/2021/07/05/sports/football/terry-donahue-dead.html",
			urlToImage:
				"https://static01.nyt.com/images/2021/07/06/obituaries/06Donahue-obit1/05Donahue1-facebookJumbo.jpg",
			publishedAt: "2021-07-05T22:02:48Z",
			content:
				"A news conference where Donahue announced his retirement in 1995 became a spectacle. The Los Angeles Times said that a U.C.L.A. spokesman prepared two news releases in case Donahue changed his mind. … [+1139 chars]",
		},
		{
			source: {
				id: null,
				name: "Slashdot.org",
			},
			author: "EditorDavid",
			title: "Why the Music Industry Doesn't Hate YouTube Any More",
			description:
				"Today is Record Store Day, an annual event celebrating the culture of independently-owned record stores. And music industry players have said they actually got more money from the sale of vinyl records than they do from YouTube. \n\nBut is that changing? The Ne…",
			url: "https://news.slashdot.org/story/21/06/12/0423240/why-the-music-industry-doesnt-hate-youtube-any-more",
			urlToImage: "https://a.fsdn.com/sd/topics/youtube_64.png",
			publishedAt: "2021-06-12T15:34:00Z",
			content:
				"Today is Record Store Day, an annual event celebrating the culture of independently-owned record stores. And music industry players have said they actually got more money from the sale of vinyl recor… [+1935 chars]",
		},
	],
};

export function NewsList({ navigation }) {
	let [news, setNews] = useState();
	let [isLoading, setLoading] = useState(true);
	let [modal, setModal] = useState({ show: false, text: "" });

	const fetchData = async (search = "latest") => {
		setLoading(true);

		let api1 = "b0e49a4f098c489998b8a333cb0e3bcb";
		let api2 = "74e937ea92984615a88c624b0dae9f66";

		let url = `https://newsapi.org/v2/top-headlines?q=${search}&apiKey=${api1}`;
		let data = null;

		try {
			const resporse = await fetch(url);
			data = await resporse.json();
		} catch (e) {
			data = testData;
		}

		if (data.status === "ok" && data.totalResults > 0) {
			setNews(data.articles);
		} else if (data.code === "rateLimited") {
			setNews(testData.articles);
			setModal({ show: true, text: "You have made too many requests recently. Page loaded with default news" });
		} else {
			setModal({ show: true, text: "News not found." });
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Header fetchData={fetchData} />

			{isLoading ? (
				<ActivityIndicator size="large" color="#000" style={{ marginTop: "50%" }} />
			) : (
				<FlatList
					data={news}
					keyExtractor={(item) => Math.random().toString()}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => navigation.navigate("NewsPage", item)}>
							<NewsItem title={item.title} urlToImage={item.urlToImage} />
						</TouchableOpacity>
					)}
				/>
			)}

			<NewsModal visible={modal.show}>
				<View style={style.modal}>
					<Text style={style.text}>{modal.text}</Text>
					<TouchableOpacity onPress={() => setModal({ show: false })}>
						<Text style={style.btn}>Close</Text>
					</TouchableOpacity>
				</View>
			</NewsModal>
		</>
	);
}

const style = StyleSheet.create({
	modal: {
		paddingVertical: 20,
		paddingHorizontal: 30,
		borderRadius: 20,
		backgroundColor: "#fff",
		alignItems: "center",
		maxWidth: "85%",
	},
	text: {
		fontSize: 18,
		marginBottom: 15,
	},
	btn: {
		color: "#00a6ff",
		fontSize: 16,
	},
});

NewsList.propTypes = {
	news: PropTypes.arrayOf(PropTypes.object),
};
