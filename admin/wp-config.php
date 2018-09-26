<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'admin-ironhack');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'BvE1M7Cj?o}NfC25P,[5vt! z!;$5Xh(r_B,RF.^,Y9Xr?S .TdQ{1:$?b@VxyaM');
define('SECURE_AUTH_KEY',  '9+qhI;S?RX-7VL?SBys#}*;c.j.pkH`%rP2^R|Sd~kuPG =ZX!-(0?;!::QqQFy6');
define('LOGGED_IN_KEY',    '+{42$&6rG~h<R3(G$[elV~jlJ!AC.,J@14+@cdt=,6_VN@` Jp=CZJSKuFN-Yxfp');
define('NONCE_KEY',        '}yBddU,dNNLI|xY0LjTl=lHA$<a{U)sRrLMSU0YUu&%]DwMq$f 7&kNd(VMV11g;');
define('AUTH_SALT',        'U<`O~6VH~-m-eB?UZ^/>^8%dLsfs=7J=P<[h02jdA3m~2][*kr8V/f;(O)hGIm0@');
define('SECURE_AUTH_SALT', ':<XTmQOG1(C;ozus:ct_!D(U,z8Qh]dw[ba9R7p:ur+)#rS%!+OP{t8M.LT6,tqf');
define('LOGGED_IN_SALT',   '3TpgR:%:{uaBHsQ$5XH,Z &,@ouGo!(B8O^G*9psPbFe+xX][)z@S >:PFwW43t>');
define('NONCE_SALT',       'gt~xLSt]%qnkKf1Xk@8{CSKbpY{rir4+4~UP`|t2MD&mMzgW@EI%t%^3>ICN>2J6');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'emp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
