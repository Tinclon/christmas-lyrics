Ext.define('ListItem', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['text']
    }
});
        
var treeStore = Ext.create('Ext.data.TreeStore', {
	model: 'ListItem',
    defaultRootProperty: 'items',
    root: {
    	text: 'ChristmasLyrics',
        items: [
        	{ text: 'A-M', items: [
        		{ text: 'A Holly Jolly Christmas', leaf: true },
        		{ text: 'Angels We Have Heard On High', leaf: true },
        		{ text: 'Away in a Manger', leaf: true },
        		{ text: 'Carol of the Bells', leaf: true },
        		{ text: 'Christmas Bells', leaf: true },
        		{ text: 'Deck The Halls', leaf: true },
        		{ text: 'Far, Far Away on Judea’s Plains', leaf: true },
        		{ text: 'Frosty the Snowman', leaf: true },
        		{ text: 'God Rest Ye Merry, Gentlemen', leaf: true },
        		{ text: 'Good King Wenceslas', leaf: true },
        		{ text: 'Hark! The Herald Angels Sing', leaf: true },
        		{ text: 'I Heard the Bells on Christmas Day', leaf: true },
        		{ text: 'I Wonder As I Wander', leaf: true },
        		{ text: 'I\'m Getting Nuttin\' For Christmas', leaf: true },
        		{ text: 'Il est né le divin enfant', leaf: true },
        		{ text: 'It Came upon the Midnight Clear', leaf: true },
        		{ text: 'Jingle Bells', leaf: true },
        		{ text: 'Joy to the world', leaf: true },
        		{ text: 'Mary, Did You Know?', leaf: true },
        		]
        	},
        	{ text: 'N-Z', items: [
        		{ text: 'O Christmas Tree', leaf: true },
        		{ text: 'O Come O Come Emmanuel', leaf: true },
        		{ text: 'O Holy Night', leaf: true },
        		{ text: 'O Little Town of Bethlehem', leaf: true },
        		{ text: 'Oh, Come, All Ye Faithful', leaf: true },
        		{ text: 'Once in Royal David’s City', leaf: true },
        		{ text: 'Petit Papa Noël', leaf: true },
        		{ text: 'Ring Out, Wild Bells', leaf: true },
        		{ text: 'Rudolph the Red Nosed Reindeer', leaf: true },
        		{ text: 'Santa Baby', leaf: true },
        		{ text: 'Santa Clause Is Coming to Town', leaf: true },
        		{ text: 'Silent Night', leaf: true },
        		{ text: 'Silver Bells', leaf: true },
        		{ text: 'Sleigh Ride', leaf: true },
        		{ text: 'Stars Were Gleaming', leaf: true },
        		{ text: 'The First Noel', leaf: true },
        		{ text: 'The Little Drummer Boy', leaf: true },
        		{ text: 'The Twelve Days of Christmas', leaf: true },
        		{ text: 'Up on the Housetop', leaf: true },
        		{ text: 'We Three Kings', leaf: true },
        		{ text: 'We Wish You a Merry Christmas', leaf: true },
        		{ text: 'What Child Is This?', leaf: true },
        		{ text: 'With Wondering Awe', leaf: true },
        		]
        	} ]
        }
});