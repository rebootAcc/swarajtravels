import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="p-4 sm:p-10 xl:p-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
        <div className="relative">
          <Image
            src="/assets/whychooseusimage.png"
            alt="why-choose-us"
            width={524}
            height={523}
            className="w-[55vw] sm:w-[40vw] xl:w-[35vw] p-3 z-10 relative"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 544 556"
            fill="none"
            className="absolute top-0 left-0"
          >
            <path
              d="M543.051 249.118C543.471 254.158 543.753 259.237 543.895 264.351L542.395 264.392C542.465 266.92 542.5 269.456 542.5 272C542.5 274.412 542.468 276.82 542.406 279.223L543.905 279.262C543.779 284.109 543.526 288.937 543.15 293.741L541.655 293.624C541.279 298.43 540.779 303.213 540.158 307.967L541.646 308.162C541.019 312.966 540.269 317.742 539.401 322.486L537.925 322.215C537.058 326.955 536.07 331.661 534.967 336.331L536.426 336.676C535.313 341.389 534.081 346.064 532.735 350.698L531.295 350.28C529.952 354.904 528.494 359.488 526.925 364.026L528.343 364.516C526.761 369.09 525.067 373.619 523.264 378.097L521.873 377.537C520.075 382.003 518.168 386.419 516.155 390.78L517.517 391.409C515.489 395.802 513.355 400.141 511.118 404.42L509.789 403.725C507.558 407.991 505.225 412.199 502.792 416.342L504.085 417.102C501.635 421.274 499.085 425.382 496.437 429.422L495.183 428.6C492.544 432.626 489.809 436.584 486.981 440.468L488.193 441.351C485.345 445.262 482.404 449.1 479.372 452.86L478.204 451.918C475.183 455.665 472.071 459.333 468.872 462.92L469.992 463.918C466.772 467.529 463.465 471.056 460.074 474.496L459.006 473.443C455.628 476.87 452.166 480.21 448.625 483.458L449.639 484.564C446.074 487.833 442.429 491.01 438.707 494.09L437.751 492.935C434.045 496.001 430.262 498.972 426.407 501.841L427.302 503.044C423.423 505.931 419.471 508.716 415.448 511.395L414.617 510.146C410.615 512.811 406.544 515.37 402.407 517.82L403.172 519.11C399.013 521.572 394.788 523.924 390.5 526.16L389.807 524.83C385.548 527.052 381.226 529.159 376.846 531.148L377.466 532.514C373.07 534.51 368.615 536.387 364.104 538.141L363.56 536.743C359.089 538.482 354.563 540.099 349.986 541.59L350.45 543.016C345.864 544.51 341.228 545.878 336.544 547.115L336.16 545.664C331.528 546.888 326.849 547.983 322.127 548.946L322.427 550.415C317.708 551.377 312.946 552.208 308.144 552.902L307.93 551.418C303.195 552.103 298.422 552.655 293.614 553.07L293.743 554.564C288.952 554.978 284.127 555.256 279.269 555.396L279.226 553.896C276.825 553.965 274.416 554 272 554C269.584 554 267.175 553.965 264.773 553.896L264.73 555.396C259.873 555.256 255.048 554.978 250.257 554.564L250.386 553.07C245.578 552.655 240.805 552.103 236.07 551.418L235.855 552.902C231.054 552.208 226.292 551.377 221.573 550.415L221.873 548.946C217.151 547.983 212.472 546.888 207.839 545.664L207.456 547.115C202.772 545.878 198.136 544.51 193.55 543.016L194.014 541.59C189.437 540.099 184.911 538.482 180.439 536.743L179.896 538.141C175.385 536.387 170.93 534.51 166.534 532.514L167.154 531.148C162.774 529.159 158.452 527.052 154.193 524.83L153.5 526.16C149.212 523.924 144.987 521.572 140.828 519.11L141.593 517.82C137.456 515.37 133.385 512.811 129.383 510.146L128.552 511.395C124.529 508.716 120.577 505.931 116.698 503.044L117.593 501.841C113.738 498.972 109.955 496.001 106.249 492.935L105.293 494.09C101.571 491.01 97.9258 487.833 94.3615 484.564L95.3754 483.458C91.8338 480.21 88.3722 476.87 84.9942 473.443L83.926 474.496C80.5349 471.056 77.2278 467.529 74.0081 463.918L75.1276 462.92C71.9292 459.333 68.8175 455.665 65.796 451.918L64.6284 452.86C61.5962 449.1 58.6545 445.262 55.8068 441.351L57.0195 440.468C54.191 436.584 51.4557 432.626 48.8172 428.6L47.5626 429.422C44.9153 425.382 42.3648 421.274 39.9148 417.102L41.2083 416.342C38.7752 412.199 36.4417 407.991 34.2112 403.725L32.8819 404.42C30.6448 400.141 28.5107 395.802 26.4831 391.409L27.8451 390.78C25.8324 386.419 23.9253 382.003 22.1272 377.537L20.7358 378.097C18.9328 373.619 17.2388 369.09 15.6573 364.516L17.0749 364.026C15.5059 359.488 14.0482 354.904 12.705 350.28L11.2645 350.698C9.91868 346.064 8.68725 341.389 7.5736 336.676L9.03339 336.331C7.92971 331.661 6.94236 326.955 6.07462 322.215L4.59915 322.486C3.73056 317.742 2.98118 312.966 2.35428 308.161L3.84167 307.967C3.22124 303.213 2.72143 298.43 2.34543 293.624L0.850001 293.741C0.474187 288.937 0.221404 284.109 0.0948232 279.262L1.59431 279.223C1.53157 276.82 1.5 274.412 1.5 272C1.5 269.456 1.53512 266.92 1.60491 264.392L0.105485 264.351C0.246699 259.237 0.529072 254.158 0.948847 249.118L2.44367 249.243C2.86571 244.176 3.42738 239.149 4.12483 234.165L2.63931 233.957C3.34743 228.897 4.19475 223.882 5.17728 218.916L6.64876 219.207C7.63416 214.226 8.7563 209.294 10.0111 204.416L8.5584 204.042C9.83042 199.096 11.238 194.205 12.777 189.373L14.2063 189.828C15.7462 184.993 17.4184 180.217 19.2187 175.503L17.8174 174.968C19.6372 170.204 21.587 165.504 23.6626 160.873L25.0315 161.486C27.1045 156.861 29.3038 152.304 31.6248 147.82L30.2927 147.131C32.635 142.606 35.1005 138.155 37.6849 133.784L38.9762 134.547C41.5536 130.187 44.2499 125.905 47.0607 121.707L45.8143 120.872C48.6469 116.641 51.5951 112.494 54.6544 108.435L55.8523 109.338C58.8994 105.296 62.0574 101.341 65.3216 97.4793L64.176 96.511C67.461 92.6247 70.853 88.8318 74.3475 85.1368L75.4373 86.1675C78.9136 82.4918 82.4918 78.9135 86.1676 75.4372L85.1369 74.3474C88.8318 70.853 92.6247 67.461 96.511 64.176L97.4794 65.3216C101.341 62.0573 105.296 58.8994 109.338 55.8522L108.435 54.6544C112.494 51.5951 116.641 48.6469 120.873 45.8142L121.707 47.0607C125.905 44.2499 130.187 41.5536 134.547 38.9762L133.784 37.6849C138.155 35.1005 142.606 32.6349 147.131 30.2927L147.82 31.6248C152.304 29.3037 156.861 27.1045 161.486 25.0314L160.873 23.6626C165.504 21.587 170.204 19.6371 174.968 17.8174L175.504 19.2186C180.217 17.4184 184.993 15.7462 189.828 14.2063L189.373 12.777C194.206 11.238 199.097 9.8304 204.042 8.55838L204.416 10.0111C209.294 8.75628 214.226 7.63414 219.207 6.64874L218.916 5.17726C223.882 4.19474 228.898 3.34742 233.957 2.6393L234.165 4.12482C239.149 3.42737 244.176 2.8657 249.243 2.44366L249.118 0.948839C254.158 0.529066 259.237 0.246695 264.351 0.105483L264.392 1.60491C266.92 1.53512 269.456 1.5 272 1.5C274.544 1.5 277.08 1.53512 279.608 1.60491L279.649 0.105485C284.763 0.246698 289.842 0.529071 294.882 0.948847L294.757 2.44367C299.824 2.86571 304.851 3.42738 309.835 4.12483L310.043 2.63931C315.103 3.34743 320.118 4.19475 325.084 5.17728L324.793 6.64876C329.774 7.63416 334.706 8.7563 339.584 10.0111L339.958 8.5584C344.904 9.83042 349.795 11.238 354.627 12.777L354.172 14.2063C359.007 15.7462 363.783 17.4184 368.497 19.2187L369.032 17.8174C373.796 19.6372 378.496 21.587 383.127 23.6626L382.514 25.0315C387.139 27.1045 391.696 29.3038 396.18 31.6248L396.869 30.2927C401.394 32.635 405.845 35.1005 410.216 37.6849L409.453 38.9762C413.813 41.5536 418.095 44.2499 422.293 47.0607L423.128 45.8143C427.359 48.6469 431.506 51.5951 435.565 54.6544L434.662 55.8523C438.704 58.8994 442.659 62.0574 446.521 65.3216L447.489 64.176C451.375 67.461 455.168 70.853 458.863 74.3475L457.832 75.4373C461.508 78.9136 465.086 82.4918 468.563 86.1676L469.653 85.1369C473.147 88.8318 476.539 92.6247 479.824 96.511L478.678 97.4794C481.943 101.341 485.101 105.296 488.148 109.338L489.346 108.435C492.405 112.494 495.353 116.641 498.186 120.873L496.939 121.707C499.75 125.905 502.446 130.187 505.024 134.547L506.315 133.784C508.9 138.155 511.365 142.606 513.707 147.131L512.375 147.82C514.696 152.304 516.896 156.861 518.969 161.486L520.337 160.873C522.413 165.504 524.363 170.204 526.183 174.968L524.781 175.504C526.582 180.217 528.254 184.993 529.794 189.828L531.223 189.373C532.762 194.206 534.17 199.097 535.442 204.042L533.989 204.416C535.244 209.294 536.366 214.226 537.351 219.207L538.823 218.916C539.805 223.882 540.653 228.898 541.361 233.957L539.875 234.165C540.573 239.149 541.134 244.176 541.556 249.243L543.051 249.118Z"
              stroke="#EF7237"
              strokeWidth="3"
              strokeDasharray="15 15"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 593 533"
            fill="none"
            className="absolute top-[0%] -left-[5%] size-[105%]"
          >
            <path
              d="M591 189.5C591 191.91 590.947 194.332 590.842 196.765L592.341 196.829C592.132 201.683 591.718 206.576 591.107 211.501L589.619 211.316C589.026 216.097 588.248 220.909 587.29 225.747L588.761 226.038C587.818 230.799 586.704 235.583 585.425 240.382L583.975 239.995C582.733 244.657 581.334 249.335 579.785 254.023L581.209 254.494C579.685 259.106 578.017 263.727 576.212 268.351L574.815 267.805C573.056 272.311 571.165 276.82 569.148 281.327L570.518 281.939C568.53 286.382 566.421 290.822 564.197 295.253L562.856 294.58C560.68 298.915 558.392 303.244 555.999 307.56L557.31 308.287C554.945 312.553 552.477 316.805 549.911 321.04L548.628 320.263C546.114 324.414 543.505 328.548 540.807 332.662L542.062 333.484C539.386 337.563 536.624 341.621 533.779 345.654L532.553 344.789C529.746 348.767 526.859 352.721 523.896 356.645L525.093 357.549C522.146 361.452 519.125 365.327 516.033 369.169L514.864 368.228C511.804 372.03 508.675 375.801 505.481 379.535L506.621 380.51C503.436 384.233 500.188 387.921 496.879 391.568L495.768 390.561C492.487 394.179 489.146 397.758 485.751 401.293L486.833 402.332C483.435 405.87 479.984 409.365 476.482 412.813L475.429 411.744C471.941 415.178 468.402 418.566 464.817 421.903L465.839 423.001C462.243 426.349 458.601 429.646 454.917 432.888L453.926 431.762C450.247 435.001 446.526 438.184 442.768 441.309L443.727 442.463C439.944 445.608 436.123 448.695 432.269 451.719L431.343 450.538C427.478 453.57 423.579 456.538 419.651 459.439L420.542 460.645C416.576 463.574 412.579 466.434 408.557 469.221L407.703 467.988C403.661 470.789 399.594 473.517 395.505 476.166L396.321 477.425C392.18 480.109 388.017 482.713 383.837 485.233L383.062 483.949C378.849 486.489 374.619 488.943 370.377 491.308L371.107 492.618C366.789 495.026 362.457 497.34 358.117 499.558L357.434 498.222C353.039 500.467 348.637 502.613 344.231 504.653L344.862 506.014C340.363 508.097 335.861 510.072 331.362 511.932L330.788 510.546C326.224 512.433 321.664 514.202 317.112 515.848L317.622 517.258C312.954 518.946 308.294 520.505 303.649 521.929L303.21 520.495C298.486 521.943 293.779 523.252 289.095 524.414L289.457 525.869C284.633 527.066 279.833 528.109 275.063 528.991L274.79 527.516C269.934 528.414 265.11 529.144 260.329 529.7L260.502 531.19C255.564 531.764 250.668 532.153 245.823 532.35L245.762 530.851C243.327 530.95 240.907 531 238.5 531C236.018 531 233.58 530.95 231.186 530.851L231.124 532.349C226.123 532.143 221.307 531.724 216.663 531.104L216.862 529.617C211.969 528.963 207.274 528.083 202.765 526.99L202.411 528.447C197.587 527.277 192.968 525.865 188.541 524.223L189.062 522.816C184.483 521.119 180.112 519.173 175.932 516.996L175.239 518.326C170.899 516.066 166.762 513.558 162.81 510.821L163.664 509.588C159.726 506.861 155.972 503.901 152.383 500.725L151.389 501.848C147.782 498.657 144.343 495.253 141.053 491.652L142.16 490.64C138.958 487.136 135.896 483.441 132.958 479.57L131.763 480.477C128.866 476.662 126.09 472.681 123.42 468.55L124.679 467.736C122.106 463.755 119.629 459.631 117.234 455.378L115.927 456.114C113.584 451.952 111.32 447.669 109.123 443.278L110.465 442.607C108.333 438.348 106.263 433.985 104.242 429.529L102.876 430.149C100.897 425.785 98.9659 421.335 97.071 416.811L98.4546 416.231C96.6058 411.816 94.7911 407.329 92.9994 402.778L91.6037 403.327C89.8436 398.856 88.1064 394.326 86.3819 389.747L87.7856 389.218C86.0939 384.726 84.4139 380.186 82.7358 375.605L81.3273 376.121C79.6718 371.602 78.0187 367.046 76.3587 362.461L77.7691 361.95C77.3272 360.73 76.8848 359.508 76.4417 358.283C75.2397 354.962 74.0324 351.626 72.8169 348.28L71.4071 348.793C69.7594 344.258 68.0963 339.704 66.4089 335.139L67.8159 334.619C66.1396 330.085 64.4391 325.54 62.7057 320.991L61.304 321.525C59.5824 317.007 57.8287 312.487 56.0345 307.973L57.4285 307.419C55.6383 302.915 53.8074 298.416 51.9276 293.93L50.5441 294.509C48.673 290.044 46.7537 285.592 44.7778 281.161L46.1477 280.551C44.1696 276.115 42.1346 271.7 40.0343 267.314L38.6814 267.962C36.5889 263.591 34.4318 259.25 32.2021 254.946L33.534 254.256C31.2972 249.939 28.987 245.657 26.5952 241.419L25.2889 242.157C22.9073 237.937 20.445 233.763 17.8936 229.641L19.1691 228.851C17.8882 226.782 16.5848 224.725 15.2579 222.683C13.8352 220.493 12.5313 218.314 11.3427 216.146L10.0275 216.868C7.48419 212.23 5.45499 207.636 3.90849 203.088L5.32864 202.605C3.67935 197.755 2.59229 192.965 2.02462 188.24L0.535325 188.419C-0.0787327 183.307 -0.0992846 178.262 0.425883 173.287L1.91759 173.444C2.4334 168.558 3.48811 163.736 5.0376 158.982L3.61143 158.517C5.14725 153.805 7.15744 149.165 9.59754 144.602L10.9203 145.309C13.1976 141.051 15.8591 136.853 18.8702 132.72L17.6578 131.837C20.5505 127.867 23.7571 123.963 27.2451 120.128L28.3547 121.138C31.6396 117.526 35.1797 113.973 38.9485 110.482L37.9292 109.382C41.5572 106.021 45.3921 102.721 49.4096 99.4822L50.3509 100.65C54.19 97.5555 58.1989 94.5168 62.3564 91.5362L61.4824 90.3171C65.5268 87.4176 69.7091 84.5743 74.0097 81.7892L74.8251 83.0483C78.9964 80.347 83.2807 77.7 87.6603 75.1091L86.8965 73.8181C91.2047 71.2695 95.6033 68.7758 100.075 66.3389L100.793 67.656C105.187 65.2619 109.652 62.9224 114.173 60.639L113.497 59.3001C117.99 57.0308 122.538 54.8172 127.123 52.6612L127.762 54.0186C132.317 51.8766 136.911 49.7912 141.528 47.7641L140.925 46.3907C145.559 44.356 150.216 42.3801 154.879 40.4646L155.449 41.8521C160.132 39.9282 164.823 38.0653 169.504 36.2651L168.966 34.8651C173.717 33.0382 178.458 31.2759 183.173 29.5799L183.681 30.9914C188.476 29.2664 193.244 27.6102 197.968 26.0245L197.49 24.6025C202.351 22.9706 207.165 21.4133 211.912 19.9326L212.359 21.3646C217.268 19.8334 222.106 18.3843 226.851 17.0196L226.437 15.578C231.421 14.1444 236.304 12.8037 241.061 11.5583L241.441 13.0094C246.485 11.6887 251.386 10.4758 256.114 9.37373L255.774 7.91289C260.909 6.7159 265.843 5.649 270.537 4.71612L270.829 6.18734C276.124 5.13507 281.109 4.25479 285.731 3.55172L285.505 2.06878C291.032 1.22791 296.049 0.638149 300.463 0.309102L300.575 1.80495C303.3 1.60182 305.781 1.5 308 1.5C310.234 1.5 312.625 1.54151 315.162 1.62718L315.212 0.128039C319.609 0.276544 324.432 0.556686 329.616 0.981212L329.494 2.47621C334 2.84523 338.783 3.32397 343.799 3.92098L343.977 2.4315C348.582 2.97957 353.382 3.62683 358.344 4.37975L358.119 5.86277C362.726 6.56194 367.474 7.35257 372.336 8.2399L372.606 6.76428C377.235 7.60912 381.967 8.54132 386.779 9.56536L386.467 11.0325C391.088 12.016 395.784 13.0845 400.533 14.2419L400.888 12.7845C405.515 13.912 410.192 15.1236 414.902 16.4231L414.503 17.8691C419.093 19.1353 423.712 20.485 428.345 21.9217L428.79 20.489C433.36 21.9063 437.943 23.408 442.523 24.9973L442.031 26.4144C446.549 27.9822 451.063 29.6355 455.557 31.3772L456.099 29.9786C460.585 31.7171 465.051 33.5437 469.483 35.4615L468.888 36.8381C473.293 38.7445 477.663 40.741 481.983 42.8307L482.636 41.4804C486.982 43.5831 491.278 45.7801 495.508 48.0745L494.793 49.393C499.021 51.6864 503.181 54.077 507.258 56.5678L508.04 55.2877C512.169 57.8103 516.214 60.4357 520.159 63.1672L519.306 64.4005C523.264 67.141 527.119 69.9879 530.855 72.9445L531.785 71.7683C535.586 74.7759 539.265 77.8973 542.806 81.1359L541.793 82.2428C545.339 85.4859 548.743 88.846 551.989 92.3264L553.086 91.3034C556.384 94.8399 559.52 98.501 562.478 102.29L561.295 103.213C564.235 106.98 566.995 110.873 569.557 114.896L570.822 114.09C573.406 118.148 575.791 122.337 577.961 126.663L576.62 127.335C578.742 131.567 580.654 135.929 582.34 140.426L583.745 139.899C585.416 144.357 586.867 148.946 588.081 153.67L586.628 154.043C587.795 158.582 588.741 163.248 589.45 168.043L590.934 167.823C591.625 172.493 592.094 177.283 592.328 182.197L590.829 182.268C590.943 184.649 591 187.06 591 189.5Z"
              stroke="#009DFF"
              strokeWidth="3"
              strokeDasharray="15 15"
            />
          </svg>
        </div>
        <div className="flex flex-col lg:items-start lg:max-w-[50%] gap-4 lg:gap-7">
          <h1 className="text-typeograph-1 text-xl sm:text-3xl font-bold">
            Why Choose Us
          </h1>
          <p className="text-typeograph-2 text-sm sm:text-base xl:text-xl">
            Swaraj Travels is a government-recognized, top-rated tour operator
            based in Siliguri, India, offering a wide range of travel solutions
            for tourists. Specializing in destinations like Darjeeling, Dooars,
            Kalimpong, Sikkim, and Rajasthan, we provide an all-encompassing
            experience for those seeking memorable trips across India. Our
            company prides itself on offering hassle-free and affordable travel
            packages that cater to the diverse needs of our customers. Whether
            you&apos;re looking for well-organized tours or flexible travel
            arrangements, we&apos;ve got you covered with packages that include
            rail tickets, flight bookings, and personalized bike and car rental
            services. We ensure that every part of your journey is taken care
            of, from transportation to accommodation, all at competitive prices.
            At Swaraj Travels, customer satisfaction is our top priority, and we
            are dedicated to making your travel experience as seamless and
            enjoyable as possible. With years of expertise in the travel
            industry, we&apos;ve earned a reputation for reliability, comfort,
            and excellence in service. Let us help you explore the beauty of
            India with confidence and ease, as we offer the perfect blend of
            convenience, affordability, and adventure.
          </p>
        </div>
      </div>
    </section>
  );
}
