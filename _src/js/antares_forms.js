/*
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Global
 * @version    0.9.1
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 *

 */

/*global componentHandler enquire ready */

import {antaresCfg} from './../config/antares_cfg';

const AntaresForms = {
    init() {
        var self = this;

        this.helpers();

        (function UiElements() {
            self.elements.checkboxesAndRadios();
            self.elements.datePicker();
            self.elements.rangeSlider();
            self.elements.simplePaginationList();
            self.elements.select();
            self.elements.spinner();
            self.elements.tooltip();

            self.elements.activateWithSelected(); //only custom code
            self.elements.footerShadow(); //only custom code
            self.elements.mobileSelectMenu(); //only custom code
            self.elements.readOnly(); //only custom code
            self.elements.search(); //only custom code

            self.elements.tabsSwiper();
            // self.elements.closeDdownBreadcrumbs();

            self.elements.openSearchFilters();

            self.elements.tablePagination();
            //   self.elements.checkGridstackSize();
        })();

        //MDL reinit
        componentHandler.upgradeAllRegistered();
    },

    helpers() {
        document.onkeydown = function (e) {
            //#145
            var li;
            var oldScroll;
            var bottomScroll;
            if ($('.antares-ac li').hasClass('is-selected')) {
                li = $('.ac-open .is-selected').height();
                oldScroll = $('.ac-open .ps__scrollbar-y-rail').css('top');
                oldScroll = oldScroll.substring(0, oldScroll.length - 2);
                bottomScroll = $('.ac-container--wrapper ul').height() - $('.ac-container--wrapper').height();
                console.log(bottomScroll);
            }
            switch (e.keyCode) {
                case 38:
                    if (oldScroll <= 0) {
                        console.log('up if');
                        console.log('START');
                    } else {
                        console.log('up else');
                        var newScroll = parseInt(oldScroll) - li;
                        $('.ac-container--wrapper').scrollTop(newScroll).perfectScrollbar('update');
                        console.log(newScroll);
                    }
                    break;
                case 40:
                    if (oldScroll >= bottomScroll) {
                        console.log('down if');
                        console.log('END');
                    } else {
                        console.log('down else');
                        var newScroll = parseInt(oldScroll) + li;
                        $('.ac-container--wrapper').scrollTop(newScroll).perfectScrollbar('update');
                        console.log(newScroll);
                    }
                    break;
            }
        };

        enquire.register('screen and (max-width: 1366px)', {
            //mobile readonly for multiple
            match: function () {
                $('select').on('select2:open', function () {
                    $('input').prop('focus', 0);
                });
            }
        });

        $(window).on('resize', function () {
            $('select').select2('close');
        });

        function menuAsideRWD() {
            // blue menu
            var mobileMenu = $('.menu-mobile-settings');
            //restrain
            if (!mobileMenu.length) {
                return;
            }
            mobileMenu.find('option').remove();
            var groups = [];
            $('.menu-aside li').each(function () {
                var link = $(this).find('> a').attr('href');
                var text = $(this).find('> a > span').eq(0).text();
                //validate if not empty
                if (!$(this).hasClass('menu-aside__title')) {
                    //if has submenu
                    if ($(this).hasClass('has-submenu')) {
                        //  create optgroup if none
                        if (!$('optgroup[label="' + text + '"]').length) {
                            mobileMenu.append('<optgroup label="' + text + '"></optgroup>');
                            groups.push(text);
                        }
                        //deal with submenu children
                    } else if ($(this).parent('.menu-aside__submenu').length) {
                        // console.log(groups)

                        mobileMenu.find('optgroup[label="' + groups[0] + '"]').append('<option value="' + link + '">' + text + '</option>');
                        // mobileMenu.find('optgroup').append('<option value="' + link + '">' + text + '</option>');
                    } else {
                        //normal options
                        groups = [];
                        mobileMenu.append('<option value="' + link + '">' + text + '</option>');
                    }
                }
            });
        }

        menuAsideRWD();
    },

    elements: {
        closeDdownBreadcrumbs() {
            // $('.breadcrumbs').click(function () {
            //     if ($('.ddown').hasClass('ddown--open')) {
            //         window.requestAnimationFrame(function () {
            //             AntaresDdownGeneral.closeAllDropdowns();
            //         });
            //     }
            // });
        },

        checkGridstackSize() {
            setTimeout(function () {
                $('.grid-stack-item').each(function () {
                    var width = $(this).attr('data-gs-width');
                    if (width <= 6) {
                        $(this).addClass('grid-size--xs'); //tablet ver - odyn pod drugik pod tretim
                        // deleteGridstackItemsIfSizeBig()
                    } else if (width <= 8) {
                        $(this).addClass('grid-size--sm'); // tablet hor - odyn pod drugim
                        // deleteGridstackItemsIfSizeBig()
                    } else if (width <= 10) {
                        $(this).addClass('grid-size--md'); // laptop - odyn pod drugim
                        // deleteGridstackItemsIfSizeBig()
                    } else if (width <= 12) {
                        $(this).addClass('grid-size--lg'); // desktop -  dwe kolonki
                        // deleteGridstackItemsIfSizeBig()
                    } else if (width <= 24) {
                        $(this).addClass('grid-size--xl');
                    }
                });

                console.log('gridstack add classes');
            }, 1000);

            function updateResizeGridstack(target) {
                // console.log('checkGridstackSize work');
                // console.log(target);
                // console.log(target.closest('.grid-stack-item'));
                target.closest('.grid-stack-item').removeClass('grid-size--xs');
                target.closest('.grid-stack-item').removeClass('grid-size--sm');
                target.closest('.grid-stack-item').removeClass('grid-size--md');
                target.closest('.grid-stack-item').removeClass('grid-size--lg');
                target.closest('.grid-stack-item').removeClass('grid-size--xl');

                setTimeout(() => {
                    const width = target.closest('.grid-stack-item').attr('data-gs-width');
                    if (width <= 6) {
                        target.closest('.grid-stack-item').addClass('grid-size--xs'); //tablet ver - odyn pod drugik pod tretim
                        // deleteGridstackItemsIfSizeBig()
                    } else if (width <= 8) {
                        target.closest('.grid-stack-item').addClass('grid-size--sm'); // tablet hor - odyn pod drugim
                        // deleteGridstackItemsIfSizeBig()
                    } else if (width <= 10) {
                        target.closest('.grid-stack-item').addClass('grid-size--md'); // laptop - odyn pod drugim
                        // deleteGridstackItemsIfSizeBig()
                    } else if (width <= 12) {
                        target.closest('.grid-stack-item').addClass('grid-size--lg'); // desktop -  dwe kolonki
                        // deleteGridstackItemsIfSizeBig()
                    } else if (width <= 24) {
                        target.closest('.grid-stack-item').addClass('grid-size--xl');
                    }

                    console.log('gridstack rwd classupdate');
                }, 100);
            }

            function checkDevices() {
                enquire.register('screen and (max-width:767px) ', {
                    match: function () {
                        $('#app-wrapper').addClass('is-mobile');
                    },
                    unmatch: function () {
                        $('#app-wrapper').removeClass('is-mobile');
                    }
                });
                enquire.register('screen and (min-width:768px) and (max-width:1023px)', {
                    match: function () {
                        $('#app-wrapper').addClass('is-tablet-vertical');
                        changeGridstackFromDevices();
                    },
                    unmatch: function () {
                        $('#app-wrapper').removeClass('is-tablet-vertical');
                    }
                });
                enquire.register('screen and (min-width:1024px) and (max-width:1199px)', {
                    match: function () {
                        $('#app-wrapper').addClass('is-tablet-horizontal');
                        changeGridstackFromDevices();
                    },
                    unmatch: function () {
                        $('#app-wrapper').removeClass('is-tablet-horizontal');
                    }
                });
                enquire.register('screen and (min-width:1200px) and (max-width:1366px)', {
                    match: function () {
                        $('#app-wrapper').addClass('is-laptop');
                        changeGridstackFromDevices();
                    },
                    unmatch: function () {
                        $('#app-wrapper').removeClass('is-laptop');
                    }
                });
                enquire.register('screen and (min-width:1367px)', {
                    match: function () {
                        $('.grid-stack-item').each(function () {
                            var width = $(this).attr('data-gs-width');
                            if (width <= 8) {
                                $(this).find('.card').addClass('grid-size--tablet-xs');
                            } else if (width <= 12) {
                                $(this).find('.card').addClass('grid-size--tablet-sm');
                            } else if (width <= 20) {
                                $(this).find('.card').addClass('grid-size--tablet-md');
                            } else if (width <= 24) {
                                $(this).find('.card').addClass('grid-size--tablet-lg');
                            }
                        });
                        $('#app-wrapper').addClass('is-desktop');
                        changeGridstackFromDevices();
                    },
                    unmatch: function () {
                        $('#app-wrapper').removeClass('is-desktop');
                    }
                });
            }

            function changeGridstackFromDevices() {
                // not needed anymore.
                // setTimeout(function() {
                //   if ($('#app-wrapper').hasClass('is-desktop')) {
                //     // console.log('THIS IS DESKTOP');
                //     $('.grid-size--lg').attr('data-gs-width', '12');
                //     $('.grid-size--md').attr('data-gs-width', '10');
                //     $('.grid-size--sm').attr('data-gs-width', '8');
                //     $('.grid-size--xs').attr('data-gs-width', '6');
                //   } else if ($('#app-wrapper').hasClass('is-laptop')) {
                //     // console.log('THIS IS LAPTOP');
                //     $('.grid-size--md').attr('data-gs-width', '12');
                //     $('.grid-size--sm').attr('data-gs-width', '10');
                //     $('.grid-size--xs').attr('data-gs-width', '8');
                //   } else if ($('#app-wrapper').hasClass('is-tablet-horizontal')) {
                //     // console.log('THIS IS TABLET HOR');
                //     $('.grid-size--sm').attr('data-gs-width', '12');
                //     $('.grid-size--xs').attr('data-gs-width', '10');
                //   } else if ($('#app-wrapper').hasClass('is-tablet-vertical')) {
                //     // console.log('THIS IS TABLET VER');
                //     $('.grid-size--xs').attr('data-gs-width', '12');
                //   }
                // }, 300);
            }

            function deleteGridstackItemsIfSizeBig() {
                // console.log('delete grid');

                if ($('#app-wrapper').hasClass('is-laptop')) {
                    $('.grid-size--lg').remove();
                } else if ($('#app-wrapper').hasClass('is-tablet-horizontal')) {
                    $('.grid-size--lg').remove();
                    $('.grid-size--md').remove();
                } else if ($('#app-wrapper').hasClass('is-tablet-vertical')) {
                    $('.grid-size--lg').remove();
                    $('.grid-size--md').remove();
                    $('.grid-size--sm').remove();
                }
            }

            $('.ui-resizable-handle').mouseup(function () {
                // WORK IF MOUSE ON(!) BTN. WAIT FOR RESIZE
                updateResizeGridstack($(this));
            });

            // first start
            checkDevices();
            setTimeout(() => {
                changeGridstackFromDevices();
            }, 2000);
        },
        openSearchFilters() {
            // enquire.register('screen and (max-width:768px)', {
            //   match: function() {

            // console.log('opensear on');
            $('.tab-search .search-box .zmdi-search').click(function () {
                // console.log('click');
                if ($('.tab-search').hasClass('tab-search--open-search')) {
                    $(this).closest('.tab-search').removeClass('tab-search--open-search');
                } else {
                    $(this).closest('.tab-search').addClass('tab-search--open-search');
                }
            });
            //   }
            // });
        },
        tabsSwiper() {
            var mySwiper = undefined;

            function activateSwiper() {
                var widthAllTabs = 0;
                for (let i = 1; i <= $('.swiper-mdl-tabs .swiper-slide').length; i++) {
                    widthAllTabs += $('.swiper-mdl-tabs .swiper-slide:nth-child(' + i + ')').width();
                }
                if ($('.swiper-container').width() < widthAllTabs) {
                    mySwiper = new Swiper('.swiper-mdl-tabs', {
                        slidesPerView: 'auto',
                        nextButton: '.swiper-mdl-tabs-next',
                        prevButton: '.swiper-mdl-tabs-prev'
                    });
                } else if (mySwiper !== undefined) {
                    mySwiper.destroy();
                    mySwiper = undefined;
                    $('.swiper-mdl-tabs').removeClass('swiper-container-horizontal');
                }
            }

            activateSwiper(true);
            $(window).resize(function () {
                activateSwiper();
            });
        },
        checkboxesAndRadios() {
            // init only when needed
            $('[data-icheck="true"]').each(function () {
                if (!$(this).closest('.icheckbox_billevo').length) {
                    $(this).iCheck({
                        checkboxClass: 'icheckbox_billevo',
                        radioClass: 'iradio_billevo',
                        increaseArea: '30%'
                    });
                }
            });
        },
        datePicker() {
            var dateRangeOptionsDashboard = {
                datepickerOptions: {
                    numberOfMonths: 2,
                    mirrorOnCollision: true, //
                    verticalOffset: 0
                }
            };

            //range
            $('[data-daterangepicker]').daterangepicker({
                onOpen: function () {
                    if ($('button').hasClass('comiseo-daterangepicker-bottom')) {
                        $('.comiseo-daterangepicker').addClass('arrow-bottom').removeClass('arrow-top');
                    } else {
                        $('.comiseo-daterangepicker').addClass('arrow-top').removeClass('arrow-bottom');
                    }
                }
            });

            $('.page-dashboard [data-daterangepicker]').daterangepicker(
                $.extend({}, dateRangeOptionsDashboard, {
                    initialText: 'Select time period to analize'
                })
            );

            //Screen Size <768
            enquire.register('screen and (max-width:768px)', {
                match: function () {
                    $('.page-dashboard [data-daterangepicker]').daterangepicker('destroy');
                    $('.page-dashboard [data-daterangepicker]').daterangepicker(
                        $.extend({}, dateRangeOptionsDashboard, {
                            initialText: 'Select time period to analize'
                        })
                    );
                }
            });

            // class cleanup
            var classesToRemove = ['ui-button', 'ui-widget', 'ui-state-default', 'ui-corner-all', 'ui-button-text-only'];

            var $target = $('.comiseo-daterangepicker-buttonpanel button');
            $.each(classesToRemove, function (i, v) {
                $target.removeClass(v);
            });
            $target.mouseover(function () {
                $(this).removeClass('ui-state-hover');
            });

            // time
            var timepicker = $('[data-timepicker]'),
                datepicker = $('[data-datepicker]'),
                datetimepicker = $('[data-datetimepicker]');

            timepicker.datetimepicker({
                datepicker: false,
                format: 'H:i',
                // onChangeDateTime: function() {
                //     $(this).validate();
                // },
                onGenerate: function (ct, $input) {
                    $input.prop('readonly', true);
                    var $this = $(this);
                    $this.find('.xdsoft_date').removeClass('xdsoft_disabled');
                    $this.find('.xdsoft_time').removeClass('xdsoft_disabled');
                }

                // onShow: function () {
                // $('.app-content[data-scroll-blocked]').addClass('data-scroll-blocked-pickers')
                // },
                // onClose: function () {
                //     $('.app-content[data-scroll-blocked]').removeClass('data-scroll-blocked-pickers')
                // }
            });
            $(window).scroll(function () {
                $('.xdsoft_datetimepicker').css('display', 'none');
            });
            datepicker.datetimepicker({
                timepicker: false,
                format: 'd.m.Y',
                onGenerate: function (ct, $input) {
                    $input.prop('readonly', true);
                    var $this = $(this);
                    $this.find('.xdsoft_date').removeClass('xdsoft_disabled');
                    $this.find('.xdsoft_time').removeClass('xdsoft_disabled');
                }

                // onShow: function () {
                //     $('.app-content[data-scroll-blocked]').addClass('data-scroll-blocked-pickers')
                // },
                // onClose: function () {
                //     $('.app-content[data-scroll-blocked]').removeClass('data-scroll-blocked-pickers')
                // }
            });

            datetimepicker.datetimepicker({
                datepicker: true,
                onGenerate: function (ct, $input) {
                    $input.prop('readonly', true);
                    var $this = $(this);
                    $this.find('.xdsoft_date').removeClass('xdsoft_disabled');
                    $this.find('.xdsoft_time').removeClass('xdsoft_disabled');
                }

                // onShow: function () {
                //     $('.app-content[data-scroll-blocked]').addClass('data-scroll-blocked-pickers')
                // },
                // onClose: function () {
                //     $('.app-content[data-scroll-blocked]').removeClass('data-scroll-blocked-pickers')
                // }
            });

            $.datetimepicker.setLocale('en');

            // alt datepicker

            if ($('[data-alt-datepicker]').length) {
                $('[data-alt-datepicker]').bootstrapMaterialDatePicker({
                    switchOnClick: true,
                    weekStart: 0,
                    time: false
                });
            }

            if ($('[data-alt-timepicker]').length) {
                $('[data-alt-timepicker]').bootstrapMaterialDatePicker({
                    switchOnClick: true,
                    date: false
                });
            }

            if ($('[data-alt-datetimepicker]').length) {
                $('[data-alt-datetimepicker]').bootstrapMaterialDatePicker({
                    switchOnClick: true,
                    format: 'dddd DD MMMM YYYY - HH:mm'
                });
            }
        },
        rangeSlider() {
            var slider = $('[data-slider]'),
                rangeSlider = $('[data-slider-range]');

            slider.slider({
                range: 'min',
                slide: function (event, ui) {
                    //if validation - must contain sibling input
                    if ($(this).siblings('.slider-val').length) {
                        $(this).siblings('.slider-val').val(ui.value);
                        // $(this).siblings('.slider-val').valid();
                    }
                }
            });

            rangeSlider.slider({
                range: true,
                min: 0,
                max: 3000,
                values: [575, 2000],
                slide: function () {
                }
            });
        },
        simplePaginationList() {
            // pagination
            require('./external/simple_pagination.js');

            var perPage = 10; // dont change position in code of this variable!

            function currentNumber(number) {
                // after click, variable perPage -> refresh simplePagination
                $('.current' + number).click(function () {
                    perPage = number;
                    let parent = $(this).closest('.datarow');
                    parent.find('.simple-pagination--list').pagination('updateItemsOnPage', number);
                    parent.find('.current10').removeClass('active'); // all disable
                    parent.find('.current25').removeClass('active');
                    parent.find('.current50').removeClass('active');
                    parent.find('.current100').removeClass('active');

                    parent.find('.current' + number).addClass('active'); // enable correct
                    parent.find('> div').perfectScrollbar('update');
                });
            }

            currentNumber(10);
            currentNumber(25);
            currentNumber(50);
            currentNumber(100);

            $('.simple-pagination--list').each(function () {
                let parent = $(this).closest('.datarow');
                let items = parent.find('.timeline li');
                let numItems = items.length;
                items.slice(perPage).hide();
                $(this).pagination({
                    items: numItems,
                    itemsOnPage: perPage,
                    cssStyle: 'antares-pagination',
                    prevText: '<i class="zmdi zmdi-long-arrow-left"></i>',
                    nextText: '<i class="zmdi zmdi-long-arrow-right"></i>',
                    displayedPages: 3,
                    onPageClick: function (pageNumber) {
                        var showFrom = perPage * (pageNumber - 1);
                        var showTo = showFrom + perPage;
                        $('.antares-pagination.pagination-list li').removeClass('prev');
                        $('.antares-pagination.pagination-list li').removeClass('next');
                        $('.antares-pagination.pagination-list li.active').prev().addClass('prev');
                        $('.antares-pagination.pagination-list li.active').next().addClass('next');
                        items.hide().slice(showFrom, showTo).show();
                        parent.find('> div').perfectScrollbar('update');
                        componentHandler.upgradeAllRegistered();
                    }
                });
                $('.antares-pagination.pagination-list li').removeClass('prev');
                $('.antares-pagination.pagination-list li').removeClass('next');
                $('.antares-pagination.pagination-list li.active').prev().addClass('prev');
                $('.antares-pagination.pagination-list li.active').next().addClass('next');
            });

            componentHandler.upgradeAllRegistered();
        },
        select() {
            //select close on remove option - fix

            var $element = $('select');

            $element.on('select2:unselect', function (e) {
                var $self = $(this);

                //tmp
                if ($self.closest('.ddown-multi__submenu').length) {
                    e.preventDefault();

                    setTimeout(function () {
                        $self.closest('.ddown-multi__submenu').css('display', 'block');
                    }, 10);
                }

                function cancelAndRemove(event) {
                    event.preventDefault();
                    removeEvents();
                }

                function removeEvents() {
                    $element.off('select2:opening', cancelAndRemove);
                    $element.off('select2:closing', cancelAndRemove);
                }

                $element.on('select2:opening', cancelAndRemove);

                $element.on('select2:closing', cancelAndRemove);
                setTimeout(removeEvents, 0);
            });

            (function select2() {
                //select2 - better, faster, harder, stronger

                var select2Base = {
                    dropdownAutoWidth: true,
                    // placeholder: 'Select an option',
                    theme: 'selectAR',
                    allowClear: true,
                    //disable search below
                    minimumResultsForSearch: Infinity
                };

                // $.fn.select2.defaults.set("theme", "AR");

                $('[data-selectAR]').each(function () {
                    var myData = $(this).attr('data-select2--class');
                    if (myData === undefined) {
                        myData = ""
                    }
                    $(this).select2($.extend({}, select2Base, {
                        theme: 'selectAR ' + myData,
                    })).on('change', function () {
                        //validation if needed
                        if ($(this).closest('.form-validation').length) {
                            // $(this).valid();
                        }
                        $(this).closest('.input-field').removeClass('error');
                    })
                });

                //WITH SEARCH
                $('[data-selectAR--search]').each(function () {
                    var myData = $(this).attr('data-select2--class');
                    if (myData === undefined) {
                        myData = ""
                    }
                    $(this).select2(
                        $.extend({}, select2Base, {
                            theme: 'selectAR ' + myData,
                            minimumResultsForSearch: 1
                        })
                    )
                        .on('change', function () {
                            //validation if needed
                            if ($(this).closest('.form-validation').length) {
                                // $(this).valid();
                            }
                            $(this).closest('.input-field').removeClass('error');
                        });
                })

                //MDL
                $('[data-selectAR--mdl]').each(function () {
                    var myData = $(this).attr('data-select2--class');
                    if (myData === undefined) {
                        myData = ""
                    }
                    $(this).select2(
                        $.extend({}, select2Base, {
                            theme: 'mdl' + myData
                        })
                    )
                        .on('change', function () {
                            //validation if needed
                            if ($(this).closest('.form-validation').length) {
                                // $(this).valid();
                            }
                            $(this).closest('.input-field').removeClass('error');
                        });
                })

                //MDL big
                $("[data-selectAR--mdl-big]").each(function () {
                    var myData = $(this).attr('data-select2--class');
                    if (myData === undefined) {
                        myData = ""
                    }
                    $(this).select2($.extend({}, select2Base, {
                        theme: "mdl-big " + myData
                    })).on("change", function () {
                        //validation if needed
                        if ($(this).closest(".form-validation").length) {
                            // $(this).valid();
                        }
                        $(this).closest(".input-field").removeClass("error");
                    });
                });
                //MDL short (v2)
                $('[data-selectAR--mdl-short]').each(function () {
                    var myData = $(this).attr('data-select2--class');
                    if (myData === undefined) {
                        myData = ""
                    }
                    $(this).select2(
                        $.extend({}, select2Base, {
                            theme: 'mdl-short ' + myData
                        })
                    )
                        .on('change', function () {
                            //validation if needed
                            if ($(this).closest('.form-validation').length) {
                                // $(this).valid();
                            }
                            $(this).closest('.input-field').removeClass('error');
                        });
                });

                //Select - tags
                $('[data-selectAR--tags]').each(function () {
                    var myData = $(this).attr('data-select2--class');
                    if (myData === undefined) {
                        myData = ""
                    }
                    $(this).select2(
                        $.extend({}, select2Base, {
                            theme: 'tags ' + myData
                        })
                    )
                        .on('change', function () {
                            //validation if needed
                            if ($(this).closest('.form-validation').length) {
                                // $(this).valid();
                            }
                            $(this).closest('.input-field').removeClass('error');
                        })
                });

                //Select - custom input (tags with 1 option)
                $('[data-selectAR--custom-input]')
                    .select2(
                        $.extend({}, select2Base, {
                            createTag: function (term, data) {
                                if (
                                    $(data).filter(function () {
                                        return this.text.localeCompare(term) === 0;
                                    }).length === 0
                                ) {
                                    return {
                                        text: term,
                                        id: '123'
                                    };
                                }
                            },
                            multiple: true,
                            tags: true,
                            theme: 'custom-input',
                            maximumSelectionLength: 1
                        })
                    )
                    .on('change', function () {
                        //validation if needed
                        if ($(this).closest('.form-validation').length) {
                            // $(this).valid();
                        }
                        $(this).closest('.input-field').removeClass('error');
                    });

                //https://github.com/select2/select2/issues/3901
                // $('[data-selectAR]').select2(select2Base);
                // //https://github.com/select2/select2/issues/3901
                //Flags integration
                //on init

                $('select[data-flag-select]').each(function () {
                    if ($(this).find('option:selected').length) {
                        var flag = $(this).find('option:selected').data('country');
                    } else {
                        return false;
                    }

                    $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);
                });

                $('select[data-flag-select], [data-flag-select-translations]').on('change', function () {
                    if ($(this).find('option:selected').length) {
                        var flag = $(this).find('option:selected').data('country');
                    } else {
                        return false;
                    }

                    $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);
                });

                //on init
                $('[data-flag-select]').select2({
                    minimumResultsForSearch: Infinity,
                    theme: 'selectAR',
                    dropdownAutoWidth: true,
                    templateResult: function (data) {
                        if (data.element && data.element.attributes['data-country']) {
                            // console.log(data);
                            var flagCode = data.element.attributes['data-country'].nodeValue;
                            var $state = $('<span class="flag-icon flag-icon-' + flagCode + '"></span><span>' + data.text + '</span>');
                            return $state;
                        } else {
                            return data.text;
                        }
                    }
                });

                //on init
                $('[data-flag-select-translations]').select2({
                    theme: 'translations',
                    dropdownAutoWidth: true,
                    templateResult: function (data) {
                        if (data.element && data.element.attributes['data-country']) {
                            // console.log(data);
                            var flagCode = data.element.attributes['data-country'].nodeValue;
                            var $state = $('<span class="flag-icon flag-icon-' + flagCode + '"></span><span>' + data.text + '</span>');
                            return $state;
                        } else {
                            return data.text;
                        }
                    }
                });

                //on init
                // Flag integration with search

                $('select[data-flag-select--search]').each(function () {
                    if ($(this).find('option:selected').length) {
                        var flag = $(this).find('option:selected').data('country');
                    } else {
                        return false;
                    }

                    $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);
                });

                $('select[data-flag-select-translations]').each(function () {
                    if ($(this).find('option:selected').length) {
                        var flag = $(this).find('option:selected').data('country');
                    } else {
                        return false;
                    }
                    $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);
                });

                $('[data-flag-select--search]').select2({
                    dropdownAutoWidth: true,
                    theme: 'selectAR',
                    minimumResultsForSearch: 1,
                    closeOnSelect: false,
                    templateResult: function (data) {
                        if (data.element && data.element.attributes['data-country']) {
                            // console.log(data);
                            var flagCode = data.element.attributes['data-country'].nodeValue;
                            var $state = $('<span class="flag-icon flag-icon-' + flagCode + '"></span><span>' + data.text + '</span>');
                            return $state;
                        } else {
                            return data.text;
                        }
                    }
                });

                $('select[data-flag-select--search]').on('change', function () {
                    if ($(this).find('option:selected').length) {
                        var flag = $(this).find('option:selected').data('country');
                    } else {
                        return false;
                    }

                    $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);
                });
            })();

            // prefix control

            $('select').each(function () {
                if ($(this).attr('data-prefix')) {
                    if (!$(this).next('.select2').find('.select__prefix').length) {
                        var prefixValue = $(this).data('prefix');
                        // $(this).siblings('.select2').find('.select2-selection__rendered').attr('data-prefix', prefixValue );
                        $(this).next('.select2').find('.select2-selection__rendered').prepend('<span class="select__prefix">' + prefixValue + '</span>');

                        $(this).on('change', function () {
                            $(this).next('.select2').find('.select2-selection__rendered').prepend('<span class="select__prefix">' + prefixValue + '</span>');
                        });
                    }
                }
            });

            enquire.register('screen and (max-width: 1366px)', {
                //mobile readonly for multiple
                match: function () {
                    if ($('.select2-selection').hasClass('select2-selection--multiple')) {
                        $('.select2-selection--multiple').find('input').attr('readonly', 'true');
                    }
                }
            });
        },
        spinner() {
            $('[data-spinner="true"]').spinner({
                min: 0,
                max: 3000,
                start: 0,
                culture: 'en-US',
                step: 1,
                numberFormat: 'C'
            });
        },
        tooltip() {
            $('[data-tooltip-inline]').qtip({
                hide: 'click'
            });
            $('.mdl-button__ripple-container').on('click', function () {
                $('[data-hasqtip]').qtip('hide');
            });

            enquire.register('screen and (max-width: 1366px)', {
                match: function () {
                    $('[data-tooltip-mobile="true"]').each(function () {
                        // Notice the .each() loop, discussed below
                        $(this).qtip({
                            style: {
                                classes: 'ar',
                                tip: {
                                    width: 9,
                                    height: 5
                                }
                            },
                            content: {
                                text: $(this).next('div.tooltip-content') // Use the "div" element next to this for the content
                            },
                            position: {
                                viewport: $(window),
                                adjust: {
                                    method: 'shift'
                                }
                            },
                            show: {
                                effect: function () {
                                    $(this).fadeIn(300); // "this" refers to the tooltip
                                }
                            },
                            hide: {
                                effect: function () {
                                    $(this).fadeOut(300); // "this" refers to the tooltip
                                }
                            },
                            events: {
                                show: function (event, api) {
                                    var $el = $(api.elements.target[0]);
                                    $el.qtip('option', 'position.my', $el.data('tooltip-my-position') == undefined ? 'top center' : $el.data('tooltip-my-position'));
                                    $el.qtip('option', 'position.at', $el.data('tooltip-target-position') == undefined ? 'bottom center' : $el.data('tooltip-target-position'));
                                }
                            }
                        });
                    });
                    $('[data-tooltip-inline-mobile!=""]').qtip({
                        style: {
                            classes: 'ar',
                            tip: {
                                width: 9,
                                height: 5
                            }
                        },
                        position: {
                            viewport: $(window),
                            adjust: {
                                method: 'shift'
                            }
                        },
                        content: {
                            attr: 'data-tooltip-inline-mobile'
                        },
                        show: {
                            effect: function () {
                                $(this).fadeIn(300); // "this" refers to the tooltip
                            }
                        },
                        hide: {
                            effect: function () {
                                $(this).fadeOut(300); // "this" refers to the tooltipc1
                            }
                        },

                        events: {
                            show: function (event, api) {
                                var $el = $(api.elements.target[0]);
                                $el.qtip('option', 'position.my', $el.data('tooltip-my-position') == undefined ? 'top center' : $el.data('tooltip-my-position'));
                                $el.qtip('option', 'position.at', $el.data('tooltip-target-position') == undefined ? 'bottom center' : $el.data('tooltip-target-position'));

                                // $(document).one("click", function() { $(".item-grp-single").qtip('hide'); });  issue #256
                            }
                        }
                    });
                },
                unmatch: function () {
                    $('[data-hasqtip]').each(function () {
                        $(this).qtip('destroy');
                    });
                }
            });

            enquire.register('screen and (min-width: 1367px)', {
                match: function () {
                    $('[data-tooltip-inline!=""]').qtip({
                        style: {
                            classes: 'ar',
                            tip: {
                                width: 9,
                                height: 5
                            }
                        },
                        position: {
                            viewport: $(window),
                            adjust: {
                                method: 'shift'
                            }
                        },
                        content: {
                            attr: 'data-tooltip-inline'
                        },
                        show: {
                            effect: function () {
                                $(this).fadeIn(300); // "this" refers to the tooltip
                            }
                        },
                        hide: {
                            effect: function () {
                                $(this).fadeOut(300); // "this" refers to the tooltipc1
                            }
                        },

                        events: {
                            show: function (event, api) {
                                var $el = $(api.elements.target[0]);
                                $el.qtip('option', 'position.my', $el.data('tooltip-my-position') == undefined ? 'top center' : $el.data('tooltip-my-position'));
                                $el.qtip('option', 'position.at', $el.data('tooltip-target-position') == undefined ? 'bottom center' : $el.data('tooltip-target-position'));

                                // $(document).one("click", function() { $(".item-grp-single").qtip('hide'); });  issue #256
                            }
                        }
                    });
                    $('[data-tooltip="true"]').each(function () {
                        // Notice the .each() loop, discussed below
                        $(this).qtip({
                            style: {
                                classes: 'ar',
                                tip: {
                                    width: 9,
                                    height: 5
                                }
                            },
                            content: {
                                text: $(this).next('div.tooltip-content') // Use the "div" element next to this for the content
                            },
                            position: {
                                viewport: $(window),
                                adjust: {
                                    method: 'shift'
                                }
                            },
                            show: {
                                effect: function () {
                                    $(this).fadeIn(300); // "this" refers to the tooltip
                                }
                            },
                            hide: {
                                effect: function () {
                                    $(this).fadeOut(300); // "this" refers to the tooltip
                                }
                            },
                            events: {
                                show: function (event, api) {
                                    var $el = $(api.elements.target[0]);
                                    $el.qtip('option', 'position.my', $el.data('tooltip-my-position') == undefined ? 'top center' : $el.data('tooltip-my-position'));
                                    $el.qtip('option', 'position.at', $el.data('tooltip-target-position') == undefined ? 'bottom center' : $el.data('tooltip-target-position'));
                                }
                            }
                        });
                    });
                },
                unmatch: function () {
                    $('[data-hasqtip]').each(function () {
                        $(this).qtip('destroy');
                    });
                }
            });
        },
        spinner() {
            $('[data-spinner="true"]').spinner({
                min: 0,
                max: 1000000000,
                start: 0,
                culture: 'en-US',
                step: 1,
                numberFormat: 'C'
            });
        },
        activateWithSelected() {
            $('.card-ctrls').click();
            let table = $('#table-ma');
            table.click(function () {
                window.requestAnimationFrame(() => {
                    if (table.attr('disabled')) {
                        console.log('AWS REMOVE')
                        table.closest('.ddown--left').removeClass('ddown--open');
                    } else {
                        console.log('AWS ADD')
                        table.closest('.ddown--left').addClass('ddown--open');
                    }
                });
            });
        },
        footerShadow() {
            $(window).scroll(function () {
                if ($(window).scrollTop() > $(document).height() - $(window).height() - 100) {
                    $('.app-content__footer').addClass('noboxshadow');
                } else {
                    $('.app-content__footer').removeClass('noboxshadow');
                }
            });
            if ($('.app-content__footer').length) {
                setTimeout(function () {
                    $('.app-content').on('ps-y-reach-end', function () {
                        $('.app-content__footer').addClass('noboxshadow');
                    });
                }, 500);

                $('.app-content').on('ps-scroll-up', function () {
                    $('.app-content__footer').removeClass('noboxshadow');
                });

                enquire.register('screen and (max-width:1199px)', {
                    match: function () {
                        var element = $('.app-content')[0];
                        element.addEventListener('scroll', function (event) {
                            var element = event.target;
                            if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                                $('.app-content__footer').addClass('noboxshadow');
                            } else {
                                $('.app-content__footer').removeClass('noboxshadow');
                            }
                        });
                    }
                });
            }

            if ($('.menu-aside-container').length) {
                $('.menu-aside-container').on('ps-y-reach-end', function (e) {
                    e.preventDefault();
                    return false;
                });
            }
        },
        mobileSelectMenu() {
            $('#select-anchor').change(function (e) {
                let selectValue = $(this).select2('data')[0].id;
                setTimeout(function () {
                    window.location.hash = selectValue;
                }, 50);
                e.preventDefault();
            });
        },
        readOnly() {
            // readonly state
            //checkbox
            $('.form-block').each(function () {
                var self = $(this);

                self.find('input[readonly]').on('ifChecked', function () {
                    setTimeout(function () {
                        self.find('input[readonly]').iCheck('uncheck');
                    }, 50);
                });
            });

            //swittch
            $('.switch-checkbox[readonly]').on('click', function () {
                return false;
            });
        },
        search() {
            var search = $('.main-head '),
                searchSingle = $('.main-head .search-box');
            //Screen Size <768
            enquire.register('screen and (max-width:767px)', {
                // #62 768 -> 767
                match: function () {
                    $(document).on('click', '.main-head .search-box > i:first-child', function () {
                        $('.main-head').addClass('main-head--mobile--search'); // #62 toggle na add
                        searchSingle.addClass('search-box--toggled');
                        searchSingle.find('input').focus();
                        $(this).closest('.search-box').find('.search-box__mdl-textfield input').focus();
                    });
                    $(document).on('click', '.main-head .search-box .search-box__close', function () {
                        $('.main-head').removeClass('main-head--mobile--search'); // #62 toggle na remove
                        $(this).closest('.search-box').removeClass('search-box--toggled');
                    });
                },
                unmatch: function () {
                    search.show();
                    $('.main-head').removeClass('main-head--mobile--search');
                    // search.toggleClass('search-box--toggled');
                    $(document).on('click', '.main-head .search-box i:first-child', function (e) {
                        $('.main-head').removeClass('main-head--mobile--search'); // #62 add line
                        $(this).closest('.search-box').removeClass('search-box--toggled'); // #62 add line
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    });
                }
            });
            //closable modificator action
            $('.search-box--closable').on('click', '.search-box__close', function () {
                $(this).closest('.search-box').find('.search-box__search-field').val('');
                $(this).hide();
            });
            $('.search-box--closable .search-box__search-field').on('input', function () {
                if ($(this).val().length === 0) {
                    $(this).closest('.search-box').find('.search-box__close').hide();
                } else {
                    $(this).closest('.search-box').find('.search-box__close').show();
                }
            });
        },
        tablePagination(){
            setTimeout(function () {
                let table = $('.tbl-c .dataTables_wrapper+.dt-area-bottom.pagination.pagination--type2')
                table.find('a').removeClass('prev');
                table.find('a').removeClass('next');
                table.find('a.current').prev().addClass('prev');
                table.find('a.current').next().addClass('next');
                table.click(function () {
                    table.find('a').removeClass('prev');
                    table.find('a').removeClass('next');
                    table.find('a.current').prev().addClass('prev');
                    table.find('a.current').next().addClass('next');
                })
            }, 300)

        }
    }
};

$(function () {
    window.AntaresForms = AntaresForms;
    AntaresForms.init();

    ready('select', function () {
        window.AntaresForms.elements.select();
    });
});
