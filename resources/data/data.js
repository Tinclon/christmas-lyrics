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
        		{ text: 'Carol of the Bells', leaf: true },
        		{ text: 'Frosty the Snowman', leaf: true },
        		]
        	},
        	{ text: 'N-Z', items: [
        		{ text: 'O Come O Come Emmanuel', leaf: true },
        		{ text: 'Rudolph the Red Nosed Reindeer', leaf: true },
        		{ text: 'We Wish You a Merry Christmas', leaf: true },
        		]
        	} ]
        }
});