<div <?php echo get_block_wrapper_attributes(['class' => 'swiper-container blog-swiper']) ?>>

  <div class="swiper-wrapper">

    <?php

    $args = array("posts_per_page" => 5);
    $slides = get_posts($args);

    ?>

    <?php foreach ($slides as $index => $slide) : ?>

      <div class="swiper-slide">

        <div class="swiper-slide-content">
          <?php

          echo '<h3 class="wp-block-heading">' . get_the_title($slide) . '</h3>';

          echo '<p class="post-date has-accent-color has-paragraph-large-font-size">' . get_the_date('M jS, Y', $slide) . '</p>';

          echo '<p class="post-excerpt">' . get_the_excerpt($slide) . '</p>';

          ?>

          <div class="wp-block-button is-style-outline is-style-outline--6">
            <a class="wp-block-button__link wp-element-button" href="<?php echo get_permalink($slide); ?>" class="wp-block-button__link">Read post</a>
          </div>
        </div>

        <div class="swiper-slide-image">
        </div>

      </div>

    <?php endforeach; ?>

    <div class="swiper-slide cta-slide">
      <p>View All Posts</p>

      <div class="wp-block-button is-style-outline is-style-outline--6">
        <a class="wp-block-button__link wp-element-button" href="<?php echo get_site_url(); ?>/blog/" class="wp-block-button__link">All Posts</a>
      </div>
    </div>

  </div>

  <div class="swiper-controller-wrap">
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
  </div>

</div>