function getStatsRemoteMode()
{
    $.ajax(
    {
        type: "get",
        url: 'http://api-paraguayos/api/remotemode',
        success: function (data)
        {
            $('.statRemoteMode').text(data);
        }
    });
}

function getStatsPresentialMode()
{
    $.ajax(
    {
        type: "get",
        url: 'http://api-paraguayos/api/presentialmode',
        success: function (data)
        {
            $('.statPresentialMode').text(data);
        }
    });
}

function getStatsPresentialRemoteMode()
{
    $.ajax(
    {
        type: "get",
        url: 'http://api-paraguayos/api/presentialremotemode',
        success: function (data)
        {
            $('.statPresentialRemoteMode').text(data);
        }
    });
}