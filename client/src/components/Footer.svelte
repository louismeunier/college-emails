<script>
    import * as updated from "../updated.json";

    const fmt_date = new Date(updated.value).toLocaleString();
</script>

<h3 class="footer">last updated {fmt_date}</h3>