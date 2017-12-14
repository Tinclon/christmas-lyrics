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
        		{ text: 'Angels We Have Heard On High', leaf: true },
        		{ text: 'Away in a Manger', leaf: true },
        		{ text: 'Carol of the Bells', leaf: true },
        		{ text: 'Far, Far Away on Judea’s Plains', leaf: true },
        		{ text: 'Frosty the Snowman', leaf: true },
        		{ text: 'Hark! The Herald Angels Sing', leaf: true },
        		{ text: 'I Heard the Bells on Christmas Day', leaf: true },
        		{ text: 'It Came upon the Midnight Clear', leaf: true },
        		{ text: 'Jingle Bells', leaf: true },
        		{ text: 'Joy to the world', leaf: true },
        		]
        	},
        	{ text: 'N-Z', items: [
        		{ text: 'O Come O Come Emmanuel', leaf: true },
        		{ text: 'O Little Town of Bethlehem', leaf: true },
        		{ text: 'Oh, Come, All Ye Faithful', leaf: true },
        		{ text: 'Once in Royal David’s City', leaf: true },
        		{ text: 'Ring Out, Wild Bells', leaf: true },
        		{ text: 'Rudolph the Red Nosed Reindeer', leaf: true },
        		{ text: 'Silent Night', leaf: true },
        		{ text: 'The First Noel', leaf: true },
        		{ text: 'We Wish You a Merry Christmas', leaf: true },
        		{ text: 'With Wondering Awe', leaf: true },
        		]
        	} ]
        }
});