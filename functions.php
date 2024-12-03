<?php

// Enqueue files

function enqueue_theme_scripts() {

  wp_enqueue_script('gsap', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', array(), false, true);
  wp_enqueue_script('gsap-2', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', array('gsap'), false, true);
  wp_enqueue_script('gsap-3', get_stylesheet_directory_uri() . '/dist/SplitText.min.js', array('gsap'), false, true);


  wp_enqueue_style('theme-styles', get_stylesheet_directory_uri() . '/dist/styles.css');
  wp_enqueue_script('theme-scripts', get_stylesheet_directory_uri() . '/dist/main.js', array('gsap', 'gsap-2', 'gsap-3'), false, true);
}
add_action('wp_enqueue_scripts', 'enqueue_theme_scripts');

// Editor styles

function editor_theme_styles() {
  add_editor_style('dist/styles.css');
  add_editor_style('dist/style-editor.css');
}
add_action('admin_init', 'editor_theme_styles');


// Fonts

function theme_fonts()
{
?>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<?php
}

// Front-end
add_action('wp_head', 'theme_fonts');
add_action('admin_head', 'theme_fonts');

// Disable emojis

function disable_emojis()
{
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('wp_print_styles', 'print_emoji_styles');
  remove_action('admin_print_styles', 'print_emoji_styles');
  remove_filter('the_content_feed', 'wp_staticize_emoji');
  remove_filter('comment_text_rss', 'wp_staticize_emoji');
  remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
  add_filter('tiny_mce_plugins', 'disable_emojis_tinymce');
  add_filter('wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2);
}
add_action('init', 'disable_emojis');

/**
 * Filter function used to remove the tinymce emoji plugin.
 * 
 * @param array $plugins 
 * @return array Difference betwen the two arrays
 */
function disable_emojis_tinymce($plugins)
{
  if (is_array($plugins)) {
    return array_diff($plugins, array('wpemoji'));
  } else {
    return array();
  }
}

/**
 * Remove emoji CDN hostname from DNS prefetching hints.
 *
 * @param array $urls URLs to print for resource hints.
 * @param string $relation_type The relation type the URLs are printed for.
 * @return array Difference betwen the two arrays.
 */
function disable_emojis_remove_dns_prefetch($urls, $relation_type)
{
  if ('dns-prefetch' == $relation_type) {
    /** This filter is documented in wp-includes/formatting.php */
    $emoji_svg_url = apply_filters('emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/');

    $urls = array_diff($urls, array($emoji_svg_url));
  }

  return $urls;
}


// WP core update - don't send emails

add_filter('auto_core_update_send_email', 'wpb_stop_auto_update_emails', 10, 4);

function wpb_stop_update_emails($send, $type, $core_update, $result)
{
  if (!empty($type) && $type == 'success') {
    return false;
  }
  return true;
}


// Register all ACF blocks

// add_action('init', 'register_acf_blocks');
// function register_acf_blocks()
// {
//   foreach (glob(get_stylesheet_directory() . '/blocks/*/') as $path) {
//     register_block_type($path . 'block.json');
//   }
// }

// Allow SVG uploads

function cc_mime_types($mimes)
{
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

// Google Tag Manager

// function add_gtm_head()
// {
//   $gtm_head_script = <<<'EOD'
//   <!-- Google Tag Manager -->
// <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-K4X96LV4');</script>
// <!-- End Google Tag Manager -->
// EOD;
//   echo $gtm_head_script;
// }
// add_action('wp_head', 'add_gtm_head');

// function add_gtm_body()
// {
//   $gtm_body_script = <<<'EOD'
//   <!-- Google Tag Manager (noscript) -->
// <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4X96LV4"
// height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
// <!-- End Google Tag Manager (noscript) -->
// EOD;
//   echo $gtm_body_script;
// }

// add_action('wp_body_open', 'add_gtm_body');

function my_custom_favicon()
{
  echo '<link rel="icon" href="' . get_template_directory_uri() . '/favicon.ico" sizes="32x32">';
  echo '<link rel="icon" href="' . get_template_directory_uri() . '/favicon.svg" type="image/svg+xml">';
}
add_action('wp_head', 'my_custom_favicon');
add_action('admin_head', 'my_custom_favicon');

// function playsthatwork_register_block_styles()
// {
//   register_block_style('core/button', array(
//     'name'         => 'underlined',
//     'label'        => __('Underlined', 'playsthatwork'),
//   ));
// }

// add_action('init', 'playsthatwork_register_block_styles');

// Noscript for when JS is disabled

function noscript_fallback()
{
?>
  <noscript>
    <style>
      html body .fade-up {
        visibility: visible;
        transform: translateY(0);
      }

      html body .home-hero-h1 {
        visibility: visible;
      }
    </style>
  </noscript>
<?php
}

add_action('wp_head', 'noscript_fallback');