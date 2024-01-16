var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3593052, 127.1069474),
    zoom: 11
});

// 1. 정보 창 + 마커
var marker1 = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3609942, 127.110699),
        icon: {
            url: 'https://ssl.pstatic.net/static/maps/img/icons/pin_s_1.png',
            size: new naver.maps.Size(22, 30),
            anchor: new naver.maps.Point(11, 30)
        },
        title: '1번 마커',
        map: map
    }),
    iwContent1 = [
        '<div>',
            '<div style="margin:0;padding:0;">',
                '<a href="#" class="spmc btn_clear">핀 삭제</a>',
                '<div>정보 창 + 마커 1번 콘텐츠입니다.</div>',
            '</div>',
        '</div>'
    ].join(''),
    infowindow1 = new naver.maps.InfoWindow({
        content: iwContent1
    });

$(infowindow1.getWrapElement()).find('.btn_clear').on('click', function(e) {
    infowindow1.close();
});

naver.maps.Event.addListener(marker1, 'click', function(e) {
    infowindow1.open(map, marker1);
});

var marker2 = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.35573, 127.1106584),
        icon: {
            url: 'https://ssl.pstatic.net/static/maps/img/icons/pin_s_2.png',
            size: new naver.maps.Size(22, 30),
            anchor: new naver.maps.Point(11, 30)
        },
        title: '2번 마커',
        map: map
    }),
    iwContent2 = [
        '<div>',
            '<div style="margin:0;padding:0;">',
                '<a href="#" class="spmc btn_clear">핀 삭제</a>',
                '<div>정보 창 + 마커 2번 콘텐츠입니다.</div>',
            '</div>',
        '</div>'
    ].join(''),
    infowindow2 = new naver.maps.InfoWindow({
        content: iwContent2
    });


$(infowindow2.getWrapElement()).find('.btn_clear').on('click', function(e) {
    infowindow2.close();
});

naver.maps.Event.addListener(marker2, 'click', function(e) {
    infowindow2.open(map, marker2);
});

infowindow2.open(map, marker2);

// 2. HTML 마커
var markerContent = [
        '<div style="position:absolute;">',
            '<div class="infowindow" style="display:none;position:absolute;width:220px;height:20px;top:-46px;left:-100px;background-color:white;z-index:1;border:1px solid black;margin:0;padding:0;">',
                '<a href="#" class="spmc btn_clear">핀 삭제</a>',
                '<div>HTML 마커 콘텐츠입니다.</div>',
                '<div style="margin: 0px; padding: 0px; width: 0px; height: 0px; position: absolute; border-width: 24px 10px 0px; border-style: solid; border-color: rgb(51, 51, 51) transparent; border-image: initial; pointer-events: none; box-sizing: content-box !important; transform-origin: right bottom 0px; transform: skewX(0deg); bottom: -25px; left: 100px;"></div>',
                '<div style="margin: 0px; padding: 0px; width: 0px; height: 0px; position: absolute; border-width: 24px 10px 0px; border-style: solid; border-color: rgb(255, 255, 255) transparent; border-image: initial; pointer-events: none; box-sizing: content-box !important; transform-origin: right bottom 0px; transform: skewX(0deg); bottom: -22px; left: 100px;"></div>',
            '</div>',
            '<div class="pin_s" style="cursor: pointer; width: 22px; height: 30px;">',
                '<img src="https://ssl.pstatic.net/static/maps/img/icons/pin_s_3.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; -webkit-user-select: none; position: absolute; width: 22px; height: 30px; left: 0px; top: 0px;">',
                '<div class="pins_s_tooltip" style="display:none;width:150px;height:20px;position:absolute;top:5px;left:25px;">HTML 마커 툴팁입니다.</div>',
            '</div>',
        '</div>'
    ].join(''),
    htmlMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3560258, 127.10203),
        map: map,
        icon: {
            content: markerContent,
            size: new naver.maps.Size(22, 30),
            anchor: new naver.maps.Point(11, 30)
        }
    }),
    elHtmlMarker = htmlMarker.getElement();

$(elHtmlMarker).on('click', 'img', function(e) {
    $(elHtmlMarker).find('.infowindow').show();
});

$(elHtmlMarker).on('mouseenter', 'img', function(e) {
    $(elHtmlMarker).find('.pins_s_tooltip').show();
});

$(elHtmlMarker).on('mouseout', 'img', function(e) {
    $(elHtmlMarker).find('.pins_s_tooltip').hide();
});

$(elHtmlMarker).on('click', 'a.btn_clear', function(e) {
    $(elHtmlMarker).find('.infowindow').hide();
});

// 3. 사용자 정의 오버레이
var CustomOverlay = function(options) {
    // 마커 이미지 크기이다. draw 메서드에서 마커 위치를 잡을 때 사용한다.
    this._imgSize = new naver.maps.Size(22, 30);
    
    // 오버레이에서 필요한 엘리먼트를 준비한다.
    this._prepareDOM();

    this.setPosition(options.position);
  
    // 지도와 오버레이를 연결한다.
    this.setMap(options.map || null);
};

CustomOverlay.prototype = new naver.maps.OverlayView();
CustomOverlay.prototype.constructor = CustomOverlay;

CustomOverlay.prototype.setPosition = function(position) {
    this._position = position;
  
    // Setter 메서드를 이용해 좌표가 변경되면 오버레이 엘리먼트 위치를 다시 잡을 수 있도록 draw 메서드를 호출한다.
    this.draw();
};

CustomOverlay.prototype.getPosition = function() {
    return this._position;
};

CustomOverlay.prototype.onAdd = function() {
    // 오버레이가 위치할 페인을 결정한다. 이 예제에서는 정보 창을 올리는 floatPane을 사용한다.
    var paneName = 'floatPane',
        floatPane = this.getPanes()[paneName];
  
    // 오버레이 엘리먼트를 페인에 추가한다.
    this._element.appendTo(floatPane);
    // 이벤트 리스너를 등록한다.
    this._bindEvent();
};

CustomOverlay.prototype.draw = function() {
    if (!this.getMap()) {
        return;
    }

    var projection = this.getProjection(), // 오버레이 엘리먼트의 위치를 잡기 위해 프로젝션을 가져온다.
        position = this.getPosition(), // 오버레이 위치를 가져온다(위/경도).
        pixelPosition = projection.fromCoordToOffset(position); // 평면 좌표를 화면 좌표로 변환한다.
  
    // 화면좌표를 그대로 사용하면 마커 이미지 기준 (0, 0)이 위치한다.
    // 마커의 가운데 아래쪽 뽀족한 부분을 위치로 사용하려면 그만큼 엘리먼트를 움직여야 한다.
    this._element.css('left', pixelPosition.x - (this._imgSize.width / 2));
    this._element.css('top', pixelPosition.y - this._imgSize.height);
};

CustomOverlay.prototype.onRemove = function() {
    // 등록된 이벤트를 해제한다.
    this._unbindEvent();
    // 추가된 엘리먼트를 제거한다.
    this._element.remove();
};

CustomOverlay.prototype._onClick = function() {
    this._iw.show();
};

CustomOverlay.prototype._onClear = function() {
    this._iw.hide();
};

CustomOverlay.prototype._onEnter = function() {
    this._tooltip.show();
};

CustomOverlay.prototype._onLeave = function() {
    this._tooltip.hide();
};

CustomOverlay.prototype._bindEvent = function() {
    this._element
        .on('click', 'img', this._onClick.bind(this))
        .on('click', '.btn_clear', this._onClear.bind(this))
        .on('mouseenter', 'img', this._onEnter.bind(this))
        .on('mouseout', 'img', this._onLeave.bind(this));
};

CustomOverlay.prototype._unbindEvent = function() {
    this._element.off();
};

CustomOverlay.prototype._prepareDOM = function() {
    var markerContent = [
        '<div style="position:absolute;">',
            '<div class="infowindow" style="display:none;position:absolute;width:240px;height:20px;top:-46px;left:-110px;background-color:white;z-index:1;border:1px solid black;margin:0;padding:0;">',
                '<a href="#" class="spmc btn_clear">핀 삭제</a>',
                '<div>사용자 정의 오버레이 콘텐츠입니다.</div>',
                '<div style="margin: 0px; padding: 0px; width: 0px; height: 0px; position: absolute; border-width: 24px 10px 0px; border-style: solid; border-color: rgb(51, 51, 51) transparent; border-image: initial; pointer-events: none; box-sizing: content-box !important; transform-origin: right bottom 0px; transform: skewX(0deg); bottom: -25px; left: 110px;"></div>',
                '<div style="margin: 0px; padding: 0px; width: 0px; height: 0px; position: absolute; border-width: 24px 10px 0px; border-style: solid; border-color: rgb(255, 255, 255) transparent; border-image: initial; pointer-events: none; box-sizing: content-box !important; transform-origin: right bottom 0px; transform: skewX(0deg); bottom: -22px; left: 110px;"></div>',
            '</div>',
            '<div class="pin_s" style="cursor: pointer; width: 22px; height: 30px;">',
                '<img src="https://ssl.pstatic.net/static/maps/img/icons/pin_s_4.png" alt="" style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; -webkit-user-select: none; position: absolute; width: 22px; height: 30px; left: 0px; top: 0px;">',
                '<div class="pins_s_tooltip" style="display:none;width:150px;height:20px;position:absolute;top:5px;left:25px;">사용자 정의 오버레이 마커 툴팁입니다.</div>',
            '</div>',
        '</div>'
    ].join('');

    this._element = $(markerContent);
    this._iw = this._element.find('.infowindow');
    this._tooltip = this._element.find('.pins_s_tooltip');
};

var overlay = new CustomOverlay({
    map: map,
    position: new naver.maps.LatLng(37.3609478, 127.1021847)
});