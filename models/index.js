var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');



var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: true,
        get: function(){
            var title = this.getDataValue('title');
            return this.getDataValue('/wiki/') + title;
        },
        validate: {
            isURL: true
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
});

module.exports = {
    db: db,
    Page: Page,
    User: User
};
