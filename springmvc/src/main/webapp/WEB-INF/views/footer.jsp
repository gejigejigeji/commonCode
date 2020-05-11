<script src="js/main.js"></script>
<script type="text/javascript" src="js/GalMenu.js"></script>
<script type="text/javascript">
    var items = document.querySelectorAll('.menuItem');
    for (var i = 0,
             l = items.length; i < l; i++) {
        items[i].style.left = (50 - 40 * Math.cos( - 0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
        items[i].style.top = (50 + 40 * Math.sin( - 0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%"
    }
    $(document).ready(function() {
        $('body').GalMenu({
            'menu': 'GalDropDown'
        })
    });</script>
</body>
</html>
