USE necx;

DROP TABLE IF EXISTS item;

DROP TABLE IF EXISTS nft;
DROP TABLE IF EXISTS sportscard;
DROP TABLE IF EXISTS tcgcard;

DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS collectible;

DROP TABLE IF EXISTS subcategory;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS card_number;

DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS alphabet;

DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS role;

CREATE TABLE role (
    id 				INT NOT NULL PRIMARY KEY,
    name 			VARCHAR(255) NOT NULL
);

CREATE TABLE `user` (
    id 				INT NOT NULL PRIMARY KEY,
	role_id			INT NOT NULL,
			
    name 			VARCHAR(255) NOT NULL,
	email			VARCHAR(255) NOT NULL,

    created_at 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	modified_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES role(id)

);

CREATE TABLE card_number (
    id 				INT AUTO_INCREMENT PRIMARY KEY,
    name 			VARCHAR(255) NOT NULL
);

CREATE TABLE category (
    id 				INT NOT NULL PRIMARY KEY,
    name 			VARCHAR(255) NOT NULL
);

CREATE TABLE company (
    id 				INT NOT NULL PRIMARY KEY,
    name 			VARCHAR(255) NOT NULL
);

CREATE TABLE alphabet (
    id 				INT NOT NULL PRIMARY KEY,
    name 			VARCHAR(255) NOT NULL
);

CREATE TABLE subcategory (
    id 				INT NOT NULL PRIMARY KEY,
    name 			VARCHAR(255) NOT NULL,
    category_id 	INT not null,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE collectible (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    subcategory_id  INT NOT NULL,
    name            VARCHAR(255) NOT NULL,
    year            CHAR(4) NOT NULL,
    image           TEXT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subcategory_id) REFERENCES subcategory(id)
);

CREATE TABLE tcgcard (
    collectible_id  BIGINT PRIMARY KEY, -- also FK to collectible.id
    card_number_id  INT NOT NULL,
    alphabet_id     INT NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    links           VARCHAR(255),
    set_name        VARCHAR(255),
    set_code        VARCHAR(255),
    series          VARCHAR(255),
    set_series_code VARCHAR(255),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collectible_id) REFERENCES collectible(id),
	FOREIGN KEY (card_number_id) REFERENCES card_number(id),
	FOREIGN KEY (alphabet_id) REFERENCES alphabet(id)
);

CREATE TABLE sportscard (
    collectible_id  BIGINT PRIMARY KEY, -- also FK to collectible.id
    card_number_id  INT NOT NULL,
    company_id      INT NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    links           VARCHAR(255),
    autographed     BIT(1) NOT NULL DEFAULT 0,
    parallel        BIT(1) NOT NULL DEFAULT 0,
	serial_numbered BIT(1) NOT NULL DEFAULT 0,
    set_name        VARCHAR(255),
    sub_set         VARCHAR(255),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collectible_id) REFERENCES collectible(id),
	FOREIGN KEY (card_number_id) REFERENCES card_number(id),
	FOREIGN KEY (company_id) REFERENCES company(id)
);

CREATE TABLE nft (
    collectible_id  BIGINT PRIMARY KEY, -- also FK to collectible.id
    blockchain      VARCHAR(50) NOT NULL,
    contract_addr   VARCHAR(255) NOT NULL,
    token_id        VARCHAR(255) NOT NULL,
    metadata_url    TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collectible_id) REFERENCES collectible(id)
);

CREATE TABLE item (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    collectible_id  BIGINT NOT NULL,
    user_id         INT NOT NULL,
	front 			VARCHAR(500) NOT NULL,
	back  			VARCHAR(500) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collectible_id) REFERENCES collectible(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- ROLES
INSERT INTO role (id, name) VALUES 
	(1, 'Admin'),
	(2, 'User');

-- Companies
INSERT INTO company (id, name) VALUES
    (1, 'Topps'),
    (2, 'Donruss'),
    (3, 'Fleer'),
    (4, 'Score'),
    (5, 'Upper Deck'),
	(6, 'Panini');

-- Alphabets
INSERT INTO alphabet (id, name) VALUES
    (1, 'english'),
    (2, 'japanese'),
    (3, 'simplified chinese'),
    (4, 'traditional chinese');

-- Categories
INSERT INTO category (id, name) VALUES
	(-1, 'Unknown'),
    ( 1, 'TCG'),
    ( 2, 'Sports'),
    ( 3, 'Other');

-- Subcategories
INSERT INTO subcategory (id, category_id, name) VALUES
    ( -1, -1, 'Unknown'),
    (100,  1, 'Pokémon'),
    (101,  1, 'Magic the Gathering'),
    (102,  1, 'Yu-Gi-Oh!'),
    (103,  1, 'Star Wars  TCG'),
    (104,  1, 'Locarna'),
    (105,  1, 'Star Trek TCG'),
    (106,  1, 'One Piece'),
    (107,  1, 'Flesh and Blood'),
    (108,  1, 'Riftbound'),
    (109,  1, 'MetaZoo'),
    (110,  1, 'Garbage Pail Kids'),
    (111,  1, 'Star Wars Unlimited'),
    (112,  1, 'Digimon'),
    (113,  1, 'Dragon Ball Super'),
    (114,  1, 'Weiss Schwarz'),
    (115,  1, 'Union Arena'),
    (116,  1, 'Force of Will'),
    (117,  1, 'Grand Archive'),
    (118,  1, 'Vanguard'),
    (119,  1, 'Marvel Champions'),
    (200,  2, 'Baseball'),
    (201,  2, 'American Football'),
    (202,  2, 'Formula 1'),
    (203,  2, 'Football'),
    (207,  2, 'Basketball'),
    (204,  2, 'Golf'),
    (205,  2, 'Tennis'),
    (206,  2, 'Ice Hockey'),
    (208,  2, 'MMA');

INSERT INTO collectible (id, subcategory_id, name, year) VALUES (-1, -1, 'Unknown Collectible', '0000');
	
INSERT INTO collectible (subcategory_id, name, year) VALUES
	(200, 'Darryl Strawberry', '1991'),
	(200, 'Darryl Strawberry', '1993'),
	(200, 'Darryl Strawberry', '1997'),
	(200, 'Darryl Strawberry', '1998'),
	(200, 'Darryl Strawberry', '2011');

INSERT INTO card_number (name) VALUES
	('64'),
	('291'),
	('200'),
	('89'),
	('DAST');
	
INSERT INTO sportscard (collectible_id, card_number_id, company_id, full_name, set_name, sub_set, autographed, serial_numbered) VALUES
	(1, 1, 1, '', 'Topps', 'Desert Shield', 0, 0),
	(2, 2, 1, '', 'Topps Finest', 'Refractor', 0, 0),
	(3, 3, 2, '', 'Leaf', 'Fractal Matrix Die Cuts', 0, 0),
	(4, 4, 2, '', 'Donruss Signature Series', 'Millenium Marks', 1, 1),	
	(5, 5, 1, '', 'Topps Triple Threads', 0, 1);	