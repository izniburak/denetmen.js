/**
 * denetmen.js (for jQuery)
 * version: 1.0.0
 *
 * author: @izniburak <info@burakdemirtas.org>
 * url: https://github.com/izniburak/denetmen.js 
 * licence: The MIT License (MIT) - Copyright (c) - http://opensource.org/licenses/MIT
 */
(function($) 
{
	$.fn.denetmen = function(options) 
	{
		var $this = $(this);

		$.fn.denetmen.defaults = 
		{
			item: "denetmen",
			default: "Not entered value!",
			highlight: true,
			modal: false
		};
		
		var o = $.extend({}, $.fn.denetmen.defaults, options);
		var message = null;
		
		$('html head').append('<style id="denetmenjs">.denetmenjs-require{border-color:#da0000;background-color:#fedad9}</style>');
		
		$($this).submit(function()
		{
			var $required = false;
			
			$($this).find('[data-' + o.item + ']').each(function(index, elem)
			{
				var $el = $(this);
				console.log($el);
				if( $.trim($el.val()) == '' || (($el.attr('type') == 'checkbox' || $el.attr('type') == 'radio') && $el.is(':checked') === false) )
				{
					message = ( $.trim($el.attr('data-' + o.item)) === '' ? o.default + ' ('+ $el.attr('name').toUpperCase() +')' : $el.attr('data-' + o.item));
					
					if(o.modal)
					{
						var title		= ( typeof(o.modal.title) === 'undefined' ? 'Oppss!' : o.modal.title);
						var button		= ( typeof(o.modal.button) === 'undefined' ? 'OK' : o.modal.button);
						var buttonClass	= ( typeof(o.modal.buttonClass) === 'undefined' ? 'primary' : o.modal.buttonClass);
						var fade		= ( typeof(o.modal.fade) === 'undefined' ? false : o.modal.fade);
						
						var modalLayout = '<div id="denetmenjs-modal" class="modal'+(fade === true ? ' fade' : '')+'" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">'+title+'</h4></div><div class="modal-body">'+message+'</div><div class="modal-footer"><button type="button" class="btn btn-'+buttonClass+'" data-dismiss="modal">'+button+'</button></div></div></div></div>';
						
						$('html body').append(modalLayout);
						$('div#denetmenjs-modal').modal();
						$('div#denetmenjs-modal').on('hidden.bs.modal', function (e) 
						{
							$('div#denetmenjs-modal').remove();
						});
					}
					else 
					{
						alert(message);
					}
					
					if(o.highlight)
						$el.addClass('denetmenjs-require');
					
					$required = true;
					return false;
				}
			});

			if($required === false)
				return true;
			else 
				return false;
		});
		
		$($this).on('focus', '.denetmenjs-require', function()
		{
			$(this).removeClass('denetmenjs-require');
		});
	};
})(jQuery);
