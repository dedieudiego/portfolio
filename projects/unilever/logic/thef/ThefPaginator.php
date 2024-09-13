<?php
class ThefPaginator
{
	private $recordsPage = 10;
	private $totalRecords;				// total number of db records
	private $begin = 1;					// number of the begning page
	private $maxIndex = 5;				// maximum of page index to show
	private $rstart = 0;				// value of the starting record
	private $aHref = 'javascript:;';	// link function and {p} variable -> Ex: http://www.site.com?module.php?page={p}
	private $onClick = '';				// onclick action
	private $template = 'pager.html';	// html para usar de base
	private $filePath = '';				// ruta de acceso hasta el html
	private $showMoreInfo = false;		// Mostrar informacion ampliada (cantidad de registros, etc)
	private $page = 1;					// numero de pagina actual
	private $recordIni = 0;				// El primer registro de la primer pagina comienza desde $recordIni
	private $classSelected = 'active';
	private $prevNextAlways = false;
	private $classNoselected = '';
	private $classDisabled = 'disabled';

	public function __construct( $sFilePath = null , $sTemplateName = null )
	{
		if( !is_null($sFilePath) )
			$this->filePath = $sFilePath;

		if( !is_null($sTemplateName) )
			$this->template = $sTemplateName;
		
		$this->page = 1;
	}

	public function setRecordsPage($value)
	{
		$this->recordsPage = $value;
	}

	public function setTotalRecords($value)
	{
		$this->totalRecords = $value;
	}

	public function setRecordIni($indexIni)
	{
		$this->recordIni = $indexIni;
	}

	public function setMaxPages($value)
	{
		$this->maxIndex = $value;
	}

	public function setAHREF($value)
	{
		$this->onClick = '';
		$this->aHref = $value;
	}

	public function setOnClick($value)
	{
		$this->onClick = $value;
		$this->aHref = 'javascript:;';
	}

	public function setClassSelected($value)
	{
		$this->classSelected = $value;
	}

	public function setClassNoSelected($value)
	{
		$this->classNoselected = $value;
	}

	public function setPage($page){
		$this->page = $page;
	}

	public function showMoreInfo($value){
		$this->showMoreInfo = $value;
	}

	public function setTemplate($value){
		$this->template = $value;
	}

	public function setPrevNextAlways ($value){
		$this->prevNextAlways = $value;
	}

        public function setClassDisabled($value) {
                $this->classDisabled = $value;
        }

	public function getHTML()
	{
		if ($this->totalRecords > 0)
		{
			$oTemplate = new ThefTemplate($this->template, $this->filePath);

			// number of total pages
			$total_pages = ceil($this->totalRecords / $this->recordsPage);
			if ($total_pages > 0)
			{
				// number of the last record in this page
				$pag_end = min(($this->begin * $this->recordsPage - 1), $total_pages);
				// number of the first link
				$starting = max(1, $this->begin - $this->maxIndex);
				// number of the last link
				$ending = min($total_pages, $this->begin + $this->maxIndex - 1);

				// number of the starting record
				if ($this->begin == 1)
					$this->rstart = 0 ;
				else
					$this->rstart = ($this->begin - 1) * $this->recordsPage;

				// first link to listing pages
				$init_iter = max(1, min($total_pages - $this->maxIndex + 1, ceil($this->page - ($this->maxIndex / 2))));

				// Anterior = Actual - Paginado MAX
				//$prev = max(1, $this->p - $this->max_index);
				// Anterior = anterior al primero visible
				//$prev = max(1, $init_iter - 1);

				

				//PREV CORRE UNA PAGINA ANTES
				$prev = max(1, $this->page - 1);
				if ($this->page > 1 || $this->prevNextAlways)
				{
					$oTemplate->newBlock('PREV');
					$oTemplate->assign('href', str_replace('{p}', $prev, $this->aHref));
					$oTemplate->assign('onclick', str_replace('{p}', $prev, $this->onClick));
					if ($init_iter == 1) $oTemplate->assign('class', $this->classDisabled);

					$oTemplate->newBlock('INICIO');
					$oTemplate->assign('href', str_replace('{p}', 1, $this->aHref));
					$oTemplate->assign('onclick', str_replace('{p}', 1, $this->onClick));
				}

				// last link to listing pages
				$final_iter = min($total_pages, $init_iter + $this->maxIndex - 1);
				// Siguiente = Actual + Paginado MAX
				//$next = min($this->p + $this->max_index, $total_pages);
				// Siguiente = siguiente pagina no visible
				$next = min($final_iter + 1, $total_pages);

				//NEXT CORRE UNA PAGINA DESPUES
				$next = min($this->page + 1, $total_pages);

                if ($this->page < $total_pages || $this->prevNextAlways)
                //if ($final_iter < $total_pages || $this->prevNextAlways)
				{
					$oTemplate->newBlock('NEXT');
					$oTemplate->assign('href', str_replace('{p}', $next, $this->aHref));
					$oTemplate->assign('onclick', str_replace('{p}', $next, $this->onClick));
					if ($final_iter == $total_pages) $oTemplate->assign('class', $this->classDisabled);

					$oTemplate->newBlock('FIN');
					$oTemplate->assign('href', str_replace('{p}', $total_pages, $this->aHref));
					$oTemplate->assign('onclick', str_replace('{p}', $total_pages, $this->onClick));
				}


				for ($i = $init_iter; $i <= $final_iter; $i++)
				{
					$oTemplate->newBlock('PAGE');
					$class = ($i == $this->page) ? $this->classSelected :  $this->classNoselected;
					$oTemplate->assign('class', $class);
					$oTemplate->assign('href', str_replace('{p}', $i, $this->aHref));
					$oTemplate->assign('onclick', str_replace('{p}', $i, $this->onClick));
					$oTemplate->assign('p', $i);
				}

				if ($this->showMoreInfo)
				{
					$oTemplate->newBlock('MORE_INFO');
					$oTemplate->assign('current_records', ($this->page-1)*$this->recordsPage+1);
					$oTemplate->assign('current_records_last', min(($this->page)*$this->recordsPage, $this->totalRecords*1));
					$oTemplate->assign('current_page', $this->page);
					$oTemplate->assign('total_pages', $total_pages);
					$oTemplate->assign('total_records', $this->totalRecords);
				}
			}
			return $oTemplate->getOutputContent();
		} else {
			return '';
		}
    }

	public function getLimit()
	{
		$limit = '';
		if ($this->recordsPage > 0)
		{
			$ini = $this->recordIni;
			if (is_numeric($this->page) && $this->page > 1)
			{
				$ini = max(0, ($this->page - 1) * $this->recordsPage);
				$ini += $this->recordIni;
			}
			$limit = " LIMIT $ini, $this->recordsPage";
		}
		return $limit;
	}

	public function getHTMLTotal()
	{
		$sHTML = '';

		if ($this->recordsPage > 0)
		{
			$iRegistroInicial = ($this->totalRecords == 0) ? 0 : 1;
			
			if (is_numeric($this->page) && $this->page > 1)
			{
				$iRegistroInicial = max(1, ($this->page - 1) * $this->recordsPage + 1);
			}

			$iRegistroFinal = min($this->totalRecords, $iRegistroInicial + $this->recordsPage - 1);
			$sHTML = $iRegistroInicial. ' - ' . $iRegistroFinal . ' de '. $this->totalRecords;
		}
		return $sHTML;
	}

}